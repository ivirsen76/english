module.exports = {
    host: 'localhost',
    port: 3030,
    mysql: 'mysql://root:root@localhost:3306/feather',
    public: '../../../public/',
    auth: {
        idField: 'id',
        token: {
            secret:
                'EkM4Gh5d27p+pmE9WJbYWSexlDxDF+RM19AJUSx3RfbziO1It4sjOS9iWMD4F1z3uQvZsYKXrI19YqqKrtAZWQ==',
        },
        local: {},
    },
}