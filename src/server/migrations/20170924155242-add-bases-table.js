module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bases', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
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
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            price: Sequelize.INTEGER,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('bases')
    },
}
