console.warn(
    'You are using the default filter for the basetree service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'
)

module.exports = function(data, connection, hook) {
    return data
}
