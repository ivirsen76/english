require('dotenv').config()

const fs = require('fs-extra')
const mysql = require('mysql')
const { execSync } = require('child_process')
const _map = require('lodash/map')
const path = require('path')

const {
    IE_DB_NAME,
    IE_DB_HOSTNAME,
    IE_DB_USERNAME,
    IE_DB_PASSWORD,
    IE_ALLOW_RESTORING_DB,
} = process.env

const connectionConfig = {
    host: IE_DB_HOSTNAME,
    user: IE_DB_USERNAME,
    password: IE_DB_PASSWORD,
    database: IE_DB_NAME,
}
const dumpPath = path.join(__dirname, 'dump.sql')

if (!IE_ALLOW_RESTORING_DB) {
    throw new Error('Cannot change DB on production')
}

module.exports = {
    restoreDb: () => {
        const command = `mysql -h ${IE_DB_HOSTNAME} -u ${IE_DB_USERNAME} --password=${
            IE_DB_PASSWORD
        } ${IE_DB_NAME} < ${dumpPath}`

        execSync(command, { stdio: 'ignore' })
    },
    generateDump: async () => {
        let dump = execSync(
            `mysqldump -h ${IE_DB_HOSTNAME} -u ${IE_DB_USERNAME} --password=${IE_DB_PASSWORD} ${
                IE_DB_NAME
            } --skip-comments --extended-insert=false`
        ).toString()

        // Add empty lines
        dump = dump.replace(/(DROP TABLE IF EXISTS)/gi, '\n\n\n$1')

        // Remove auto increment
        dump = dump.replace(/ AUTO_INCREMENT=[0-9]+ /gi, ' ')

        fs.writeFileSync(dumpPath, dump)
    },

    restoreSamples: () => {
        const src = path.join(__dirname, 'sample.mp3')
        const dest = path.join(__dirname, '../../../media/samples', 'sample.mp3')

        fs.copyFileSync(src, dest)
    },
    getNumRecords: (table, conditions) => {
        const where = conditions
            ? 'WHERE ' + _map(conditions, (item, key) => `${key}="${item}"`).join(' AND ')
            : ''
        const query = `SELECT count(*) AS cnt FROM ${table} ${where}`

        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection(connectionConfig)
            connection.connect()
            connection.query(query, (error, results, fields) => {
                if (error) {
                    reject(new Error(error.message))
                } else {
                    resolve(results[0].cnt)
                }
            })
            connection.end()
        })
    },
    runQuery: query =>
        new Promise((resolve, reject) => {
            const connection = mysql.createConnection(connectionConfig)
            connection.connect()
            connection.query(query, (error, results, fields) => {
                resolve(results)
            })
            connection.end()
        }),
    getRecord: (table, conditions) => {
        const where = conditions
            ? 'WHERE ' + _map(conditions, (item, key) => `${key}="${item}"`).join(' AND ')
            : ''
        const query = `SELECT * FROM ${table} ${where} LIMIT 0, 1`

        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection(connectionConfig)
            connection.connect()
            connection.query(query, (error, results, fields) => {
                resolve(results[0])
            })
            connection.end()
        })
    },
}
