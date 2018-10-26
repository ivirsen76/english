const service = require('feathers-sequelize')
const base = require('./base-model')
const hooks = require('./hooks')

module.exports = function() {
    const app = this

    const options = {
        Model: base(app.get('sequelize')),
        paginate: {
            default: 1000,
            max: 1000,
        },
    }

    // Initialize our service with any options it requires
    const baseService = app.declareService('bases', service(options))

    // Set up our before hooks
    baseService.before(hooks.before)

    // Set up our after hooks
    baseService.after(hooks.after)
}
