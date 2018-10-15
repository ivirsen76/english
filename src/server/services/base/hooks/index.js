const hooks = require('feathers-hooks')
const { hasRole } = require('../../../hooks')
const auth = require('feathers-authentication').hooks

exports.before = {
    all: [auth.verifyToken(), auth.populateUser(), hasRole('admin')],
    find: [],
    get: [hooks.disable('rest')],
    create: [hooks.disable('rest')],
    update: [hooks.disable('rest')],
    patch: [hooks.disable('rest')],
    remove: [hooks.disable('rest')],
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
