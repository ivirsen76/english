const AWS = require('aws-sdk')
const randomstring = require('randomstring')
const temp = require('temp')
const fs = require('fs')
const fsp = require('fs-promise')
const template = require('string-template')
const exec = require('child-process-promise').exec

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})
const polly = new AWS.Polly()
const s3 = new AWS.S3()
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
        .synthesizeSpeech({
            OutputFormat: 'mp3',
            SampleRate: '22050',
            Text: text,
            VoiceId: voice,
        })
        .promise()

    const tmpFilename = await getTmpFile(data.AudioStream)
    const encodedTmpFilename = tmpFilename + '.mp3'

    // Encode with standard bitrate
    await exec(
        template(process.env.IEREMEEV_SOUND_ENCODE_MP3_COMMAND, {
            scale: 3,
            filein: tmpFilename,
            fileout: encodedTmpFilename,
        })
    )

    // Get the duration
    const info = await exec(
        template(process.env.IEREMEEV_SOUND_GET_MP3_DURATION_COMMAND, {
            filename: encodedTmpFilename,
        })
    )
    const duration = +/###(\d+)###/g.exec(info.stdout)[1]

    // Write file to the AWS S3 bucket
    const filename = `${folder}/${language}_${randomstring.generate(10)}.mp3`
    const content = await fsp.readFile(encodedTmpFilename)
    await s3
        .putObject({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `public/sounds/${filename}`,
            ACL: 'public-read',
            Body: content,
            ContentType: data.ContentType,
        })
        .promise()

    // Remove temp files
    await Promise.all([fsp.unlink(tmpFilename), fsp.unlink(encodedTmpFilename)])

    return {
        language,
        filename,
        duration,
    }
}
