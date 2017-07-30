const AWS = require('aws-sdk')
const hooks = require('./hooks')
const shuffle = require('lodash/shuffle')
const pick = require('lodash/pick')
const md5 = require('md5')
const fsp = require('fs-promise')

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})
const s3 = new AWS.S3()

const minPause = 500
const maxPause = 5000

const getPauseLength = length => {
    const result = Math.round(length / 500) * 500

    if (result < minPause) {
        return minPause
    }

    if (result > maxPause) {
        return maxPause
    }

    return result
}

class Service {
    setup(app) {
        this.app = app
    }

    constructor(options) {
        this.options = options || {}
    }

    async getPauseFiles() {
        const pause = {}
        for (let i = minPause; i <= maxPause; i += 500) {
            pause[i] = await fsp.readFile(`${__dirname}/pause/${i}.mp3`)
        }
        return pause
    }

    async create(data, params) {
        const userId = params.user.id
        const cards = await this.app.service('cards').find({
            query: {
                userId,
                status: 0,
            },
        })
        const list = shuffle(cards.data).map(card =>
            pick(card, ['usSoundFile', 'usSoundLength', 'ruSoundFile'])
        )

        const pauseFiles = await this.getPauseFiles()

        const buffers = []
        for (let card of list) {
            const ruFile = await s3
                .getObject({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: `public/sounds/${card.ruSoundFile}`,
                })
                .promise()
            buffers.push(ruFile.Body)

            buffers.push(pauseFiles[getPauseLength(card.usSoundLength + 500)])

            const usFile = await s3
                .getObject({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: `public/sounds/${card.usSoundFile}`,
                })
                .promise()
            buffers.push(usFile.Body)

            buffers.push(pauseFiles[getPauseLength(5000)])
        }

        const filename = `${userId}/${md5(userId)}/word-word.mp3`
        await s3
            .putObject({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: `public/sounds/users/${filename}`,
                ACL: 'public-read',
                Body: Buffer.concat(buffers),
                ContentType: 'application/octet-stream',
            })
            .promise()

        return Promise.resolve({ status: 'OK', filename })
    }
}

module.exports = function() {
    const app = this

    // Initialize our service with any options it requires
    app.use('/mp3', new Service())

    // Get our initialize service to that we can bind hooks
    const mp3Service = app.service('/mp3')

    // Set up our before hooks
    mp3Service.before(hooks.before)

    // Set up our after hooks
    mp3Service.after(hooks.after)
}

module.exports.Service = Service
module.exports.getPauseLength = getPauseLength
