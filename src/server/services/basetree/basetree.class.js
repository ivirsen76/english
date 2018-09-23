const { getUpdates } = require('./utils.js')
const _omit = require('lodash/omit')

class Service {
    setup(app) {
        this.app = app
    }

    constructor(options) {
        this.options = options || {}
    }

    async create(data, params) {
        const bases = this.app.service('bases')

        const result = await bases.find()
        const updates = getUpdates(result.data, data)

        for (let i = 0; i < updates.length; i++) {
            const update = updates[i]
            if (update.query === 'update') {
                await bases.patch(update.id, _omit(update, ['id', 'query']))
            }
        }

        return updates
    }
}

module.exports = function(options) {
    return new Service(options)
}

module.exports.Service = Service
