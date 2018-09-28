const generateMp3 = require('./generateMp3')

module.exports = options => async hook => {
    try {
        const { text, translate, userId } = hook.data

        if (process.env.NODE_ENV !== 'test') {
            const results = await Promise.all([
                generateMp3(`users/${userId}`, text, 'uk'),
                generateMp3(`users/${userId}`, text, 'us'),
                generateMp3(`users/${userId}`, translate, 'ru'),
            ])

            results.forEach(result => {
                hook.data[`${result.language}SoundFile`] = result.filename
                hook.data[`${result.language}SoundLength`] = result.duration
            })
        }

        hook.data.statusUpdatedAt = new Date()
    } catch (err) {
        console.error(err)
    }
}
