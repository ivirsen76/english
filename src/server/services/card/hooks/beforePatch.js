const generateMp3 = require('./generateMp3')
const removeMp3 = require('./removeMp3')
const _pick = require('lodash/pick')
const { stripBrackets } = require('../../../utils.js')

module.exports = options => async hook => {
    try {
        const id = hook.id
        const { text, translate, status, writeRightAttempts } = hook.data
        const { dataValues: currentData } = await hook.service.get(id)

        // restrict only to these fields
        hook.data = _pick(hook.data, ['text', 'translate', 'label', 'status', 'writeRightAttempts'])

        if (process.env.NODE_ENV !== 'test') {
            const stripedText = stripBrackets(text)
            const stripedTranslate = stripBrackets(translate)

            const generates = []
            if (text && currentData.text !== text) {
                await removeMp3(currentData.ukSoundFile)
                await removeMp3(currentData.usSoundFile)
                generates.push(generateMp3(`sounds/users/${currentData.userId}`, stripedText, 'uk'))
                generates.push(generateMp3(`sounds/users/${currentData.userId}`, stripedText, 'us'))
            }
            if (translate && currentData.translate !== translate) {
                await removeMp3(currentData.ruSoundFile)
                generates.push(
                    generateMp3(`sounds/users/${currentData.userId}`, stripedTranslate, 'ru')
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

        if (status && currentData.status !== status) {
            hook.data.statusUpdatedAt = new Date()
        }

        if (writeRightAttempts !== undefined) {
            hook.data.writeLastDate = new Date()
        }
    } catch (err) {
        console.log(err) // eslint-disable-line no-console
    }
}
