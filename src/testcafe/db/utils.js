import mysql from 'mysql'
import shell from 'shelljs'
import dbConfig from '../../server/config/default.js'
import parse from 'parse-db-url'
import _map from 'lodash/map'
import path from 'path'

const dumpPath = path.join(__dirname, 'dump.sql')

const db = parse(dbConfig.mysql)
const command = `mysql -u ${db.user} --password=${db.password} ${db.database} < ${dumpPath}`
shell.config.silent = true

const connection = mysql.createConnection(db)
connection.connect()

export const restoreDb = () => {
    shell.exec(command)
    exit(0)
}

export const getNumRecords = (table, conditions) => {
    const where = conditions
        ? 'WHERE ' + _map(conditions, (item, key) => `${key}="${item}"`).join(' AND ')
        : ''
    const query = `SELECT count(*) AS cnt FROM ${table} ${where}`

    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            resolve(results[0].cnt)
        })
    })
}
