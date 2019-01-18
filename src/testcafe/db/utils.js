require('dotenv').config()

const fs = require('fs-extra')
const mysql = require('mysql')
const { execSync } = require('child_process')
const _pick = require('lodash/pick')
const _map = require('lodash/map')
const path = require('path')
const { ExternalAssertionLibraryError } = require('testcafe/lib/errors/test-run')
const expect = require('expect')

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

const getStringConditions = conditions =>
    _map(conditions, (item, key) => {
        if (item === null) {
            return `${key} IS NULL`
        }

        return `${key}="${item}"`
    }).join(' AND ')

const restoreDb = () => {
    const command = `mysql -h ${IE_DB_HOSTNAME} -u ${IE_DB_USERNAME} --password=${IE_DB_PASSWORD} ${
        IE_DB_NAME
    } < ${dumpPath}`

    execSync(command, { stdio: 'ignore' })
}

const restoreSamples = () => {
    const src = path.join(__dirname, 'sample.mp3')
    const dest = path.join(__dirname, '../../../media/samples', 'sample.mp3')

    fs.copyFileSync(src, dest)
}

const generateDump = async () => {
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
}

const getNumRecords = (table, conditions) => {
    const where = conditions ? 'WHERE ' + getStringConditions(conditions) : ''
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
}

const runQuery = query =>
    new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig)
        connection.connect()
        connection.query(query, (error, results, fields) => {
            resolve(results)
        })
        connection.end()
    })

const getRecord = (table, conditions) => {
    const where = conditions ? 'WHERE ' + getStringConditions(conditions) : ''
    const query = `SELECT * FROM ${table} ${where} LIMIT 0, 1`

    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(connectionConfig)
        connection.connect()
        connection.query(query, (error, results, fields) => {
            resolve(results[0])
        })
        connection.end()
    })
}

const expectRecordToExist = async (table, conditions, data) => {
    const record = await getRecord(table, conditions)
    if (!record) {
        throw new ExternalAssertionLibraryError(`The record in table "${table}" is not found`)
    }

    if (data) {
        try {
            expect(_pick(record, Object.keys(data))).toEqual(data)
        } catch (error) {
            throw new ExternalAssertionLibraryError(
                `The record in table "${table}" has different data\n\n` + error.message
            )
        }
    }

    return record
}

module.exports = {
    restoreDb,
    restoreSamples,
    generateDump,
    getNumRecords,
    runQuery,
    getRecord,
    expectRecordToExist,
}
