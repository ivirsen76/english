import shell from 'shelljs'
import dbConfig from '../../server/config/default.js'
import parse from 'parse-db-url'

const db = parse(dbConfig.mysql)
const command = `mysql -s -u ${db.user} --password=${db.password} ${db.database} < src/tests/db/dump.sql`

export default () => {
    shell.config.silent = true
    shell.exec(command)
}
