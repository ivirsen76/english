const service = require('feathers-sequelize')
const base = require('./base-model')
const hooks = require('./hooks')

module.exports = function() {
    const app = this

    const options = {
        Model: base(app.get('sequelize')),
        paginate: {
            default: 5,
            max: 25,
        },
    }

    // Initialize our service with any options it requires
    app.use('/bases', service(options))

    // Get our initialize service to that we can bind hooks
    const baseService = app.service('/bases')

    // Set up our before hooks
    baseService.before(hooks.before)

    // Set up our after hooks
    baseService.after(hooks.after)
}