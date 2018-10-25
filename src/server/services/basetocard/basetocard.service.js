// Initializes the `basetocard` service on path `/basetocard`
const createService = require('./basetocard.class.js')
const hooks = require('./basetocard.hooks')
const filters = require('./basetocard.filters')

module.exports = function() {
    const app = this
    const paginate = app.get('paginate')

    const options = {
        name: 'basetocard',
        paginate,
    }

    // Initialize our service with any options it requires
    app.use('/api/basetocard', createService(options))

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('/api/basetocard')

    service.hooks(hooks)

    if (service.filter) {
        service.filter(filters)
    }
}
