require('dotenv').config()

const mysql = require('mysql')
const { execSync } = require('child_process')
const _map = require('lodash/map')
const path = require('path')

const { IE_DB_NAME, IE_DB_HOSTNAME, IE_DB_USERNAME, IE_DB_PASSWORD } = process.env
const dumpPath = path.join(__dirname, 'dump.sql')

const command = `mysql -h ${IE_DB_HOSTNAME} -u ${IE_DB_USERNAME} --password=${IE_DB_PASSWORD} ${
    IE_DB_NAME
} < ${dumpPath}`

const connection = mysql.createConnection({
    host: IE_DB_HOSTNAME,
    user: IE_DB_USERNAME,
    password: IE_DB_PASSWORD,
    database: IE_DB_NAME,
})
connection.connect()

module.exports = {
    restoreDb: () => {
        execSync(command, { stdio: 'ignore' })
    },
    getNumRecords: (table, conditions) => {
        const where = conditions
            ? 'WHERE ' + _map(conditions, (item, key) => `${key}="${item}"`).join(' AND ')
            : ''
        const query = `SELECT count(*) AS cnt FROM ${table} ${where}`

        return new Promise((resolve, reject) => {
            connection.query(query, (error, results, fields) => {
                resolve(results[0].cnt)
            })
        })
    },
}
