const auth = require('feathers-authentication').hooks
const { hasRole } = require('../../hooks')

module.exports = {
    before: {
        all: [auth.verifyToken(), auth.populateUser(), hasRole('admin')],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
}
