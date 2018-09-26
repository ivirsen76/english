const auth = require('feathers-authentication').hooks

module.exports.hasRole = function(role) {
    return auth.restrictToRoles({ roles: [role] })
}
