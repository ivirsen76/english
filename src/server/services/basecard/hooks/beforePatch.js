const generateMp3 = require('../../card/hooks/generateMp3')
const removeMp3 = require('../../card/hooks/removeMp3')

module.exports = options => async hook => {
    try {
        const id = hook.id
        const { text, translate } = hook.data
        const { dataValues: currentData } = await hook.service.get(id)

        // Check if we need new sound
        const generates = []
        const removes = []
        if (text && currentData.text !== text) {
            removes.push(removeMp3(currentData.ukSoundFile))
            removes.push(removeMp3(currentData.usSoundFile))
            generates.push(generateMp3(`sounds/basecards/${currentData.baseId}`, text, 'uk'))
            generates.push(generateMp3(`sounds/basecards/${currentData.baseId}`, text, 'us'))
        }
        if (translate && currentData.translate !== translate) {
            removes.push(removeMp3(currentData.ruSoundFile))
            generates.push(generateMp3(`sounds/basecards/${currentData.baseId}`, translate, 'ru'))
        }

        // Add new sounds
        if (generates.length > 0) {
            await Promise.all(removes)
            const results = await Promise.all(generates)

            results.forEach(result => {
                hook.data[`${result.language}SoundFile`] = result.filename
                hook.data[`${result.language}SoundLength`] = result.duration
            })
        }
    } catch (err) {
        console.error(err)
    }
}
