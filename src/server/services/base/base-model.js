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
            info: Sequelize.TEXT('tiny'),
            type: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'folder',
            },
            isMain: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            arrangeChildren: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'list',
            },
            label: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: '',
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            price: Sequelize.INTEGER,
        },
        {
            freezeTableName: true,
        }
    )

    return base
}
