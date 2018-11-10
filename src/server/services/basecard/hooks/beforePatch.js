const generateMp3 = require('../../card/hooks/generateMp3')
const removeMp3 = require('../../card/hooks/removeMp3')
const { stripBrackets } = require('../../../utils.js')

module.exports = options => async hook => {
    try {
        const id = hook.id
        const text = hook.data.text.trim()
        const translate = hook.data.translate.trim()
        const { dataValues: currentData } = await hook.service.get(id)

        // save trimmed values
        hook.data.text = text
        hook.data.translate = translate

        if (process.env.NODE_ENV !== 'test') {
            const stripedText = stripBrackets(text)
            const stripedTranslate = stripBrackets(translate)

            const generates = []
            if (text && currentData.text !== text) {
                await removeMp3(currentData.ukSoundFile)
                await removeMp3(currentData.usSoundFile)
                generates.push(
                    generateMp3(`sounds/basecards/${currentData.baseId}`, stripedText, 'uk')
                )
                generates.push(
                    generateMp3(`sounds/basecards/${currentData.baseId}`, stripedText, 'us')
                )
            }
            if (translate && currentData.translate !== translate) {
                await removeMp3(currentData.ruSoundFile)
                generates.push(
                    generateMp3(`sounds/basecards/${currentData.baseId}`, stripedTranslate, 'ru')
                )
            }

            // Add new sounds
            if (generates.length > 0) {
                const results = await Promise.all(generates)

                results.forEach(result => {
                    hook.data[`${result.language}SoundFile`] = result.filename
                    hook.data[`${result.language}SoundLength`] = result.duration
                })
            }
        }
    } catch (err) {
        console.error(err)
    }
}
