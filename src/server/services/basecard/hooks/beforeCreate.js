const generateMp3 = require('../../card/hooks/generateMp3')
const { stripBrackets } = require('../../../utils.js')

module.exports = options => async hook => {
    try {
        let { text, translate, baseId } = hook.data

        text = text
            .trim()
            .replace(/’/g, "'")
            .replace(/–/g, '-')
        translate = translate.trim()

        if (process.env.NODE_ENV !== 'test') {
            const stripedText = stripBrackets(text)
            const stripedTranslate = stripBrackets(translate)

            const results = await Promise.all([
                generateMp3(`sounds/basecards/${baseId}`, stripedText, 'uk'),
                generateMp3(`sounds/basecards/${baseId}`, stripedText, 'us'),
                generateMp3(`sounds/basecards/${baseId}`, stripedTranslate, 'ru'),
            ])

            results.forEach(result => {
                hook.data[`${result.language}SoundFile`] = result.filename
                hook.data[`${result.language}SoundLength`] = result.duration
            })
        }

        hook.data.text = text
        hook.data.translate = translate
        hook.data.statusUpdatedAt = new Date()
    } catch (err) {
        console.error(err)
    }
}
