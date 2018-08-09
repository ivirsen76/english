// const globalHooks = require('../../../hooks');
// const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks
const beforeCreate = require('./beforeCreate')
const beforePatch = require('./beforePatch')
const { validateCreate, validatePatch } = require('./validate')

exports.before = {
    all: [auth.verifyToken(), auth.populateUser(), auth.restrictToAuthenticated()],
    find: [auth.queryWithCurrentUser()],
    get: [],
    create: [auth.associateCurrentUser(), validateCreate(), beforeCreate()],
    update: [],
    patch: [validatePatch(), beforePatch()],
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
