const colors = require('colors/safe')
const { restoreDb } = require('../testcafe/db/utils.js')

restoreDb()

console.info(colors.green('The database has been restored'))
process.exit()
