const _pick = require('lodash/pick')
const { stripBrackets } = require('../../utils.js')

class Service {
    setup(app) {
        this.app = app
    }

    constructor(options) {
        this.options = options || {}
    }

    async update(baseId, data, params) {
        const userId = params.user.id
        const baseService = this.app.getService('bases')
        const cardService = this.app.getService('cards')
        const basecardService = this.app.getService('basecards')
        const currentBase = (await baseService.get(baseId)).dataValues

        const existingTexts = (await cardService.find({ query: { userId } })).data.map(item =>
            stripBrackets(item.text)
        )
        const newCards = (await basecardService.find({ query: { baseId } })).data
            .filter(item => !existingTexts.includes(stripBrackets(item.text)))
            .map(item => ({
                label: currentBase.label || '',
                ..._pick(item, [
                    'text',
                    'translate',
                    'ukSoundFile',
                    'ukSoundLength',
                    'usSoundFile',
                    'usSoundLength',
                    'ruSoundFile',
                    'ruSoundLength',
                ]),
            }))

        await Promise.all(newCards.map(card => cardService.create({ ...card, userId })))

        return Promise.resolve('OK')
    }
}

module.exports = function(options) {
    return new Service(options)
}

module.exports.Service = Service
