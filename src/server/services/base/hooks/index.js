const { hasRole } = require('../../../hooks')
const auth = require('feathers-authentication').hooks

exports.before = {
    all: [auth.verifyToken(), auth.populateUser(), hasRole('admin')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
}

exports.after = {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
}
