const service = require('feathers-sequelize')
const basecard = require('./basecard-model')
const hooks = require('./hooks')

module.exports = function() {
    const app = this

    const options = {
        Model: basecard(app.get('sequelize')),
        paginate: {
            default: 1000,
            max: 1000,
        },
    }

    // Initialize our service with any options it requires
    const basecardService = app.declareService('basecards', service(options))

    // Set up our before hooks
    basecardService.before(hooks.before)

    // Set up our after hooks
    basecardService.after(hooks.after)
}
