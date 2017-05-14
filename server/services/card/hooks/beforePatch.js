const generateMp3 = require('./generateMp3')


module.exports = options => async (hook) => {
    try {
        const id = hook.id
        const { text, translate } = hook.data
        const { dataValues: currentData } = await hook.service.get(id)

        // Check if we need new sound
        const promises = []
        if (currentData.text !== text) {
            promises.push(generateMp3(id, currentData.userId, text, 'uk'))
            promises.push(generateMp3(id, currentData.userId, text, 'us'))
        }
        if (currentData.translate !== translate) {
            promises.push(generateMp3(id, currentData.userId, translate, 'ru'))
        }

        // Add new sounds
        if (promises.length > 0) {
            const results = await Promise.all(promises)

            results.forEach((result) => {
                hook.data[`${result.language}SoundFile`] = result.filename
                hook.data[`${result.language}SoundLength`] = result.duration
            })
        }
    } catch (err) {
        console.log(err) // eslint-disable-line no-console
    }
}
