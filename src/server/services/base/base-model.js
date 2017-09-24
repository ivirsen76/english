const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    const base = sequelize.define(
        'bases',
        {
            parentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            position: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            info: {
                type: Sequelize.TEXT('tiny'),
                allowNull: false,
                defaultValue: '',
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'folder',
            },
            label: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: '',
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
