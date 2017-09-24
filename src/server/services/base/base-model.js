const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    const base = sequelize.define(
        'bases',
        {
            parentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            position: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            info: {
                type: Sequelize.TEXT('tiny'),
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            label: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: Sequelize.INTEGER,
        },
        {
            freezeTableName: true,
        }
    )

    base.sync()

    return base
}
