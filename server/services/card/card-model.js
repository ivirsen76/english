const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const card = sequelize.define('cards', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        translate: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        label: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    })

    return card
}
