const { RDS_DB_NAME, RDS_USERNAME, RDS_HOSTNAME, RDS_PASSWORD, RDS_PORT } = process.env
const mysqlUrl = `mysql://${RDS_USERNAME}:${RDS_PASSWORD}@${RDS_HOSTNAME}:${RDS_PORT}/${
    RDS_DB_NAME
}`

module.exports = {
    host: 'word-word.herokuapp.com',
    port: process.env.PORT,
    mysql: mysqlUrl,
    public: '../../../build/',
    auth: {
        idField: 'id',
        token: {
            secret: process.env.ENGLISH_API_AUTH_TOKEN_SECRET,
        },
        local: {},
    },
}
