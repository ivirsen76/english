const generateMp3 = require('./generateMp3')

module.exports = options => async hook => {
    try {
        const { text, translate, userId } = hook.data

        const results = await Promise.all([
            generateMp3(userId, text, 'uk'),
            generateMp3(userId, text, 'us'),
            generateMp3(userId, translate, 'ru'),
        ])

        results.forEach(result => {
            hook.data[`${result.language}SoundFile`] = result.filename
            hook.data[`${result.language}SoundLength`] = result.duration
        })
        hook.data.statusUpdatedAt = new Date()
    } catch (err) {
        console.log(err) // eslint-disable-line no-console
    }
}
