const randomstring = require('randomstring')
const temp = require('temp')
const fs = require('fs-extra')
const template = require('string-template')
const exec = require('child-process-promise').exec
const { lameCommand, mediainfoCommand } = require('../../../utils.js')
const { getPath } = require('../../../media.js')
const AWS = require('aws-sdk')

const polly = new AWS.Polly()
const voices = {
    uk: 'Amy',
    us: 'Salli',
    ru: 'Tatyana',
}

const getTmpFile = content =>
    new Promise((resolve, reject) => {
        temp.open({ prefix: 'english_', suffix: '.mp3' }, (err, info) => {
            if (err) throw err

            fs.writeFile(info.path, content, err1 => {
                if (err1) throw err1
                resolve(info.path)
            })
        })
    })

module.exports = async (folder, text, language) => {
    const voice = voices[language]
    if (!voice) {
        throw new Error(`There is no voice for "${language}" language`)
    }

    // Generate mp3 using AWS Polly
    const data = await polly
        .synthesizeSpeech({ OutputFormat: 'mp3', SampleRate: '22050', Text: text, VoiceId: voice })
        .promise()

    const tmpFilename = await getTmpFile(data.AudioStream)
    const fileFolder = getPath(folder)
    const filename = `${fileFolder}/${language}_${randomstring.generate(10)}.mp3`

    await fs.ensureDir(fileFolder)

    // Encode with standard bitrate
    await exec(template(lameCommand, { scale: 3, filein: tmpFilename, fileout: filename }))

    // Get the duration
    const info = await exec(template(mediainfoCommand, { filename }))
    const duration = +/###(\d+)###/g.exec(info.stdout)[1]

    // Remove temp file
    await fs.unlink(tmpFilename)

    return { language, filename: filename.replace(`${getPath()}/`, ''), duration }
}
