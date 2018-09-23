const Sequelize = require('sequelize')
const card = require('./card')
const base = require('./base')
const basecard = require('./basecard')
const authentication = require('./authentication')
const user = require('./user')
const mp3 = require('./mp3')

const basetree = require('./basetree/basetree.service.js')

module.exports = function() {
    const app = this

    const sequelize = new Sequelize(app.get('mysql'), {
        dialect: 'mysql',
        logging: false,
    })
    app.set('sequelize', sequelize)

    app.configure(authentication)
    app.configure(user)
    app.configure(card)
    app.configure(base)
    app.configure(basecard)
    app.configure(mp3)
    app.configure(basetree)
}
