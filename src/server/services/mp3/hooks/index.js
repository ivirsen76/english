const auth = require('feathers-authentication').hooks

exports.before = {
    all: [],
    find: [],
    get: [],
    create: [auth.verifyToken(), auth.populateUser(), auth.restrictToAuthenticated()],
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
