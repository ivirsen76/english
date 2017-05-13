// const globalHooks = require('../../../hooks');
// const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks
const afterCreate = require('./afterCreate')

exports.before = {
    all: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.restrictToAuthenticated(),
    ],
    find: [
        auth.queryWithCurrentUser(),
    ],
    get: [],
    create: [
        auth.associateCurrentUser(),
    ],
    update: [],
    patch: [],
    remove: [],
}

exports.after = {
    all: [],
    find: [],
    get: [],
    create: [
        afterCreate(),
    ],
    update: [],
    patch: [],
    remove: [],
}
