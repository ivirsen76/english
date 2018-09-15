const hooks = require('./hooks')
const shuffle = require('lodash/shuffle')
const pick = require('lodash/pick')
const md5 = require('md5')
const fs = require('fs')
const fsp = require('fs-promise')
const temp = require('temp')
const template = require('string-template')
const exec = require('child-process-promise').exec
const { AWS, lameCommand } = require('../../utils.js')

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

    writeToTmpFile(content) {
        return new Promise((resolve, reject) => {
            temp.open({ prefix: 'english_', suffix: '.mp3' }, (err, info) => {
                if (err) throw err

                fs.writeFile(info.path, content, err1 => {
                    if (err1) throw err1
                    resolve(info.path)
                })
            })
        })
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
        // eslint-disable-next-line no-restricted-syntax
        for (let card of list) {
            const ruFile = await s3
                .getObject({
                    Bucket: process.env.IE_AWS_S3_BUCKET,
                    Key: `public/sounds/${card.ruSoundFile}`,
                })
                .promise()
            buffers.push(ruFile.Body)

            buffers.push(pauseFiles[getPauseLength(card.usSoundLength + 500)])

            const usFile = await s3
                .getObject({
                    Bucket: process.env.IE_AWS_S3_BUCKET,
                    Key: `public/sounds/${card.usSoundFile}`,
                })
                .promise()
            buffers.push(usFile.Body)

            buffers.push(pauseFiles[getPauseLength(5000)])
        }

        const tmpFilename = await this.writeToTmpFile(Buffer.concat(buffers))
        const encodedTmpFilename = tmpFilename + '.mp3'

        // Reencode file to clean up resulted mp3
        await exec(
            template(lameCommand, { scale: 1, filein: tmpFilename, fileout: encodedTmpFilename })
        )

        // Write file to the AWS S3 bucket
        const filename = `${userId}/${md5(userId)}/word-word.mp3`
        const content = await fsp.readFile(encodedTmpFilename)
        await s3
            .putObject({
                Bucket: process.env.IE_AWS_S3_BUCKET,
                Key: `public/sounds/users/${filename}`,
                ACL: 'public-read',
                Body: content,
                ContentType: 'application/octet-stream',
            })
            .promise()

        // Remove temp files
        await Promise.all([fsp.unlink(tmpFilename), fsp.unlink(encodedTmpFilename)])

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
