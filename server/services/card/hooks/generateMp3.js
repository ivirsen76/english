const AWS = require('aws-sdk')
const randomstring = require('randomstring')

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})
const polly = new AWS.Polly()
const s3 = new AWS.S3()
const voices = {
    en: 'Emma',
    us: 'Salli',
    ru: 'Tatyana',
}

const generateMp3 = async (id, userId, text, language) => {
    const filename = `${userId}/${id}_${language}_${randomstring.generate(6)}.mp3`
    const voice = voices[language]
    if (!voice) {
        throw new Error(`There is no voice for "${language}" language`)
    }

    const data = await polly.synthesizeSpeech({
        OutputFormat: 'mp3',
        SampleRate: '22050',
        Text: text,
        VoiceId: voice,
    }).promise()

    await s3.putObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `public/${filename}`,
        ACL: 'public-read',
        Body: data.AudioStream,
        ContentType: data.ContentType,
    }).promise()
}


module.exports = options => async (hook) => {
    try {
        const { id, text, translate, userId } = hook.result.dataValues

        await Promise.all([
            generateMp3(id, userId, text, 'en'),
            generateMp3(id, userId, text, 'us'),
            generateMp3(id, userId, translate, 'ru'),
        ])

        console.log('The files have been saved') // eslint-disable-line no-console
    } catch (err) {
        console.log(err) // eslint-disable-line no-console
    }
}
