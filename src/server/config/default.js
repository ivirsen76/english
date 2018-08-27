const {
    RDS_DB_NAME = 'feather',
    RDS_HOSTNAME = 'localhost',
    RDS_USERNAME = 'root',
    RDS_PASSWORD = 'root',
    RDS_PORT = 3306,
    HOST = 'localhost',
    PORT = 303,
    PUBLIC_PATH = '../../../public/',
    ENGLISH_API_AUTH_TOKEN_SECRET = 'O1It4sjOS9iWMD4F1z3uQvZsYKXrI19YqqKrtAZWQ==',
} = process.env

module.exports = {
    host: HOST,
    port: PORT,
    mysql: `mysql://${RDS_USERNAME}:${RDS_PASSWORD}@${RDS_HOSTNAME}:${RDS_PORT}/${RDS_DB_NAME}`,
    public: PUBLIC_PATH,
    auth: {
        idField: 'id',
        token: {
            secret: ENGLISH_API_AUTH_TOKEN_SECRET,
        },
        local: {},
    },
}
