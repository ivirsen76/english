const hooks = require('feathers-hooks')
const auth = require('feathers-authentication').hooks
const { hasRole } = require('../../../hooks')
const beforeCreate = require('./beforeCreate')
const beforePatch = require('./beforePatch')
const afterCreate = require('./afterCreate')

exports.before = {
    all: [],
    find: [],
    get: [hooks.disable('rest')],
    create: [auth.verifyToken(), auth.populateUser(), hasRole('admin'), beforeCreate()],
    update: [hooks.disable('rest')],
    patch: [auth.verifyToken(), auth.populateUser(), hasRole('admin'), beforePatch()],
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
