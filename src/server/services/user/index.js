const service = require('feathers-sequelize')
const user = require('./user-model')
const hooks = require('./hooks')

module.exports = function() {
    const app = this

    const options = {
        Model: user(app.get('sequelize')),
        paginate: {
            default: 5,
            max: 25,
        },
    }

    // Initialize our service with any options it requires
    const userService = app.declareService('users', service(options))

    // Set up our before hooks
    userService.before(hooks.before)

    // Set up our after hooks
    userService.after(hooks.after)
}
