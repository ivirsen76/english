const generateMp3 = require('./generateMp3')
const { stripBrackets } = require('../../../utils.js')

module.exports = options => async hook => {
    try {
        const { text, translate, userId } = hook.data

        hook.data.text = text.trim()
        hook.data.translate = translate.trim()

        if (process.env.NODE_ENV !== 'test') {
            const stripedText = stripBrackets(text)
            const stripedTranslate = stripBrackets(translate)

            const results = await Promise.all([
                generateMp3(`sounds/users/${userId}`, stripedText, 'uk'),
                generateMp3(`sounds/users/${userId}`, stripedText, 'us'),
                generateMp3(`sounds/users/${userId}`, stripedTranslate, 'ru'),
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
