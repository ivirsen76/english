const hooks = require('./hooks')
const shuffle = require('lodash/shuffle')
const pick = require('lodash/pick')
const fs = require('fs-extra')
const temp = require('temp')
const template = require('string-template')
const exec = require('child-process-promise').exec
const { lameCommand } = require('../../utils.js')
const { getFileContent, getPath, getBaseFilename } = require('../../media.js')
const md5 = require('md5')
const AWS = require('aws-sdk')
const { GeneralError, MethodNotAllowed } = require('feathers-errors')

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
            pause[i] = await fs.readFile(`${__dirname}/pause/${i}.mp3`)
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

    /** The test route to check if AWS Polly is working */
    async get(id, params) {
        if (id !== '3478') {
            throw new MethodNotAllowed()
        }

        try {
            const polly = new AWS.Polly()
            const data = await polly
                .synthesizeSpeech({
                    OutputFormat: 'mp3',
                    SampleRate: '22050',
                    Text: 'Get me the sound',
                    VoiceId: 'Amy',
                })
                .promise()

            if (data.AudioStream) {
                return Promise.resolve('OK')
            }
        } catch (e) {
            throw new GeneralError()
        }

        throw new GeneralError()
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
            // ru
            const ruFile = await getFileContent(card.ruSoundFile)
            buffers.push(ruFile)

            // pause between
            buffers.push(pauseFiles[getPauseLength(card.usSoundLength + 500)])

            // en
            const usFile = await getFileContent(card.usSoundFile)
            buffers.push(usFile)

            // pause at the end
            buffers.push(pauseFiles[getPauseLength(5000)])
        }

        const tmpFilename = await this.writeToTmpFile(Buffer.concat(buffers))
        const folder = getPath(`temp/${userId}_${md5(userId)}`)
        const filename = `${folder}/word-word.mp3`

        await fs.ensureDir(folder)

        // Reencode file to clean up resulted mp3
        await exec(template(lameCommand, { scale: 1, filein: tmpFilename, fileout: filename }))

        // Remove temp file
        await fs.unlink(tmpFilename)

        return Promise.resolve({ status: 'OK', filename: getBaseFilename(filename) })
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
