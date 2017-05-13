const generateMp3 = require('./generateMp3')


module.exports = options => async (hook) => {
    try {
        const { id, text, translate, userId } = hook.result.dataValues

        const results = await Promise.all([
            generateMp3(id, userId, text, 'uk'),
            generateMp3(id, userId, text, 'us'),
            generateMp3(id, userId, translate, 'ru'),
        ])

        const audioData = {}
        results.forEach((result) => {
            audioData[`${result.language}SoundFile`] = result.filename
            audioData[`${result.language}SoundLength`] = result.duration
        })
        audioData.statusUpdatedAt = new Date()

        // Update audio data
        await hook.service.patch(id, audioData)

        // Update result object
        hook.result.dataValues = Object.assign({}, hook.result.dataValues, audioData)
    } catch (err) {
        console.log(err) // eslint-disable-line no-console
    }
}
