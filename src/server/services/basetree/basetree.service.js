// Initializes the `basetree` service on path `/basetree`
const createService = require('./basetree.class.js')
const hooks = require('./basetree.hooks')
const filters = require('./basetree.filters')

module.exports = function() {
    const app = this
    const paginate = app.get('paginate')

    const options = {
        name: 'basetree',
        paginate,
    }

    // Initialize our service with any options it requires
    app.use('/basetree', createService(options))

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('basetree')

    service.hooks(hooks)

    if (service.filter) {
        service.filter(filters)
    }
}
