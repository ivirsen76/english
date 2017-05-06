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
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('cards')
    },
}
