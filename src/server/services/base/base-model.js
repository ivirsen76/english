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
            },
            image: Sequelize.STRING,
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
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            freezeTableName: true,
        }
    )

    return base
}
