const generateMp3 = require('./generateMp3')
const { stripBrackets } = require('../../../utils.js')

module.exports = options => async hook => {
    try {
        const { text, translate, userId } = hook.data

        if (process.env.NODE_ENV !== 'test') {
            const adjustedText = stripBrackets(text)
            const adjustedTranslate = stripBrackets(translate)

            const results = await Promise.all([
                generateMp3(`sounds/users/${userId}`, adjustedText, 'uk'),
                generateMp3(`sounds/users/${userId}`, adjustedText, 'us'),
                generateMp3(`sounds/users/${userId}`, adjustedTranslate, 'ru'),
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
