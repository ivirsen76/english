module.exports = {
    'host': 'word-word.herokuapp.com',
    'port': process.env.PORT,
    'mysql': process.env.JAWSDB_URL,
    'public': '../../dist/',
    'auth': {
        'idField': 'id',
        'token': {
            'secret': process.env.ENGLISH_API_AUTH_TOKEN_SECRET,
        },
        'local': {},
    },
};