const { restoreDb } = require('../db/utils.js')

restoreDb()

console.info('The database has been restored')
process.exit()
