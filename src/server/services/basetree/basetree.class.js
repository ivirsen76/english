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
        const bases = this.app.getService('bases')

        const result = await bases.find()
        const updates = getUpdates(result.data, data)
        const newIds = {}

        for (let i = 0; i < updates.length; i++) {
            const update = updates[i]

            if (newIds[update.parentId]) {
                update.parentId = newIds[update.parentId]
            }

            if (update.query === 'delete') {
                await bases.remove(update.id)
            }
            if (update.query === 'update') {
                await bases.patch(update.id, _omit(update, ['id', 'query']))
            }
            if (update.query === 'insert') {
                const inserted = await bases.create(_omit(update, ['id', 'query']))
                newIds[update.id] = inserted.dataValues.id
            }
        }

        return newIds
    }
}

module.exports = function(options) {
    return new Service(options)
}

module.exports.Service = Service
