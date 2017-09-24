const service = require('feathers-sequelize')
const basecard = require('./basecard-model')
const hooks = require('./hooks')

module.exports = function() {
    const app = this

    const options = {
        Model: basecard(app.get('sequelize')),
        paginate: {
            default: 5,
            max: 25,
        },
    }

    // Initialize our service with any options it requires
    app.use('/basecard', service(options))

    // Get our initialize service to that we can bind hooks
    const basecardService = app.service('/basecard')

    // Set up our before hooks
    basecardService.before(hooks.before)

    // Set up our after hooks
    basecardService.after(hooks.after)
}
