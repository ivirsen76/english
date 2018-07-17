const generateMp3 = require('../../card/hooks/generateMp3')

module.exports = options => async hook => {
    try {
        const { text, translate, baseId } = hook.data

        const results = await Promise.all([
            generateMp3(`basecards/${baseId}`, text, 'uk'),
            generateMp3(`basecards/${baseId}`, text, 'us'),
            generateMp3(`basecards/${baseId}`, translate, 'ru'),
        ])

        results.forEach(result => {
            hook.data[`${result.language}SoundFile`] = result.filename
            hook.data[`${result.language}SoundLength`] = result.duration
        })
        hook.data.statusUpdatedAt = new Date()
    } catch (err) {
        console.error(err)
    }
}
