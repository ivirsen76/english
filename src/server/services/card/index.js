const service = require('feathers-sequelize')
const card = require('./card-model')
const hooks = require('./hooks')

module.exports = function() {
    const app = this

    const options = {
        Model: card(app.get('sequelize')),
        paginate: {
            default: 10000,
            max: 10000,
        },
    }

    // Initialize our service with any options it requires
    const cardService = app.declareService('cards', service(options))

    // Set up our before hooks
    cardService.before(hooks.before)

    // Set up our after hooks
    cardService.after(hooks.after)
}
