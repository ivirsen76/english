require('dotenv').config()

const {
    IE_DB_NAME,
    IE_DB_HOSTNAME,
    IE_DB_USERNAME,
    IE_DB_PASSWORD,
    IE_SERVER_HOST,
    IE_SERVER_PORT,
    IE_API_AUTH_TOKEN_SECRET,
} = process.env

module.exports = {
    host: IE_SERVER_HOST,
    port: IE_SERVER_PORT,
    mysql: `mysql://${IE_DB_USERNAME}:${IE_DB_PASSWORD}@${IE_DB_HOSTNAME}:3306/${IE_DB_NAME}`,
    public: '../../../public/',
    auth: {
        idField: 'id',
        token: {
            secret: IE_API_AUTH_TOKEN_SECRET,
        },
        local: {},
    },
}
