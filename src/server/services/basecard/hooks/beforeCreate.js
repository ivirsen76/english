const generateMp3 = require('../../card/hooks/generateMp3')

module.exports = options => async hook => {
    try {
        const { text, translate, baseId } = hook.data

        hook.data.text = text.trim()
        hook.data.translate = translate.trim()

        if (process.env.NODE_ENV !== 'test') {
            const results = await Promise.all([
                generateMp3(`sounds/basecards/${baseId}`, text, 'uk'),
                generateMp3(`sounds/basecards/${baseId}`, text, 'us'),
                generateMp3(`sounds/basecards/${baseId}`, translate, 'ru'),
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
