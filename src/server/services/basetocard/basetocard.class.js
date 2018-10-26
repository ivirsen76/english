const _pick = require('lodash/pick')
const { stripBrackets } = require('../card/hooks/validate.js')

class Service {
    setup(app) {
        this.app = app
    }

    constructor(options) {
        this.options = options || {}
    }

    async update(baseId, data, params) {
        const userId = params.user.id
        const cardService = this.app.getService('cards')
        const basecardService = this.app.getService('basecards')

        const existingTexts = (await cardService.find({ query: { userId } })).data.map(item =>
            stripBrackets(item.text)
        )
        const newCards = (await basecardService.find({ query: { baseId } })).data
            .filter(item => !existingTexts.includes(stripBrackets(item.text)))
            .map(item =>
                _pick(item, [
                    'text',
                    'translate',
                    'ukSoundFile',
                    'ukSoundLength',
                    'usSoundFile',
                    'usSoundLength',
                    'ruSoundFile',
                    'ruSoundLength',
                ])
            )

        await Promise.all(newCards.map(card => cardService.create({ ...card, label: '', userId })))

        return Promise.resolve('OK')
    }
}

module.exports = function(options) {
    return new Service(options)
}

module.exports.Service = Service
