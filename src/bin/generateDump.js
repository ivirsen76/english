const { generateDump } = require('../testcafe/db/utils.js')

generateDump().then(() => {
    console.info('The database dump has been generated')
    process.exit()
})
