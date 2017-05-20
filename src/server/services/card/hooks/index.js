// const globalHooks = require('../../../hooks');
// const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks
const beforeCreate = require('./beforeCreate')
const beforePatch = require('./beforePatch')

exports.before = {
    all: [auth.verifyToken(), auth.populateUser(), auth.restrictToAuthenticated()],
    find: [auth.queryWithCurrentUser()],
    get: [],
    create: [auth.associateCurrentUser(), beforeCreate()],
    update: [],
    patch: [beforePatch()],
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
