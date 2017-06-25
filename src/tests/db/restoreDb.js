import shell from 'shelljs'
import dbConfig from '../../server/config/default.js'
import parse from 'parse-db-url'

const db = parse(dbConfig.mysql)
const command = `mysql -u ${db.user} --password=${db.password} ${db.database} < src/tests/db/dump.sql`
shell.config.silent = true

export default () => {
    shell.exec(command)
}
