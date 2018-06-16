const mysql = require('mysql')
const shell = require('shelljs')
const dbConfig = require('../../server/config/default.js')
const parse = require('parse-db-url')
const _map = require('lodash/map')
const path = require('path')

const dumpPath = path.join(__dirname, 'dump.sql')

const db = parse(dbConfig.mysql)
const command = `mysql -u ${db.user} --password=${db.password} ${db.database} < ${dumpPath}`
shell.config.silent = true

const connection = mysql.createConnection(db)
connection.connect()

module.exports = {
    restoreDb: () => {
        shell.exec(command)
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
