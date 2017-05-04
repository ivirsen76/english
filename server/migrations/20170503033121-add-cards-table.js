module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('cards', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
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
            ukSoundFile: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ukSoundLength: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            usSoundFile: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            usSoundLength: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            ruSoundFile: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ruSoundLength: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            statusUpdatedAt: Sequelize.DATE,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('cards')
    },
}
