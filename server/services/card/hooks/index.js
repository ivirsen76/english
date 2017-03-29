// const globalHooks = require('../../../hooks');
// const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

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
};

exports.after = {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
};
