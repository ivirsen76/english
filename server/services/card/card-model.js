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
        ukSoundFile: Sequelize.STRING,
        ukSoundLength: Sequelize.INTEGER,
        usSoundFile: Sequelize.STRING,
        usSoundLength: Sequelize.INTEGER,
        ruSoundFile: Sequelize.STRING,
        ruSoundLength: Sequelize.INTEGER,
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        statusUpdatedAt: Sequelize.DATE,
    }, {
        freezeTableName: true,
    })

    return card
}
