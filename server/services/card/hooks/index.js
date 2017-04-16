// const globalHooks = require('../../../hooks');
// const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks
const generateMp3 = require('./generateMp3')

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
        generateMp3(),
    ],
    update: [],
    patch: [],
    remove: [],
}
