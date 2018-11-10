const hooks = require('feathers-hooks')
const auth = require('feathers-authentication').hooks
const { hasRole } = require('../../../hooks')
const beforeCreate = require('./beforeCreate')
const beforePatch = require('./beforePatch')
const afterCreate = require('./afterCreate')
const { validateCreate, validatePatch } = require('./validate')

exports.before = {
    all: [],
    find: [],
    get: [hooks.disable('rest')],
    create: [
        auth.verifyToken(),
        auth.populateUser(),
        hasRole('admin'),
        validateCreate(),
        beforeCreate(),
    ],
    update: [hooks.disable('rest')],
    patch: [
        auth.verifyToken(),
        auth.populateUser(),
        hasRole('admin'),
        validatePatch(),
        beforePatch(),
    ],
    remove: [auth.verifyToken(), auth.populateUser(), hasRole('admin')],
}

exports.after = {
    all: [],
    find: [],
    get: [],
    create: [afterCreate()],
    update: [],
    patch: [],
    remove: [],
}
