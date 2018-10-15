const hooks = require('feathers-hooks')

exports.before = {
    all: [],
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
