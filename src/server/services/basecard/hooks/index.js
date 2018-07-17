// const auth = require('feathers-authentication').hooks
const beforeCreate = require('./beforeCreate')
const beforePatch = require('./beforePatch')

exports.before = {
    all: [],
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
    create: [],
    update: [],
    patch: [],
    remove: [],
}
