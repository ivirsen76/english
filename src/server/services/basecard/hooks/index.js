const auth = require('feathers-authentication').hooks
const { hasRole } = require('../../../hooks')
const beforeCreate = require('./beforeCreate')
const beforePatch = require('./beforePatch')
const afterCreate = require('./afterCreate')

exports.before = {
    all: [auth.verifyToken(), auth.populateUser(), hasRole('admin')],
    find: [],
    get: [],
    create: [beforeCreate()],
    update: [],
    patch: [beforePatch()],
    remove: [],
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
