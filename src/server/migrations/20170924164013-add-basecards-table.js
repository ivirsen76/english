module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('basecards', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            baseId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'bases',
                    key: 'id',
                },
                onUpdate: 'restrict',
                onDelete: 'restrict',
            },
            text: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            translate: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ukSoundFile: Sequelize.STRING,
            ukSoundLength: Sequelize.INTEGER,
            usSoundFile: Sequelize.STRING,
            usSoundLength: Sequelize.INTEGER,
            ruSoundFile: Sequelize.STRING,
            ruSoundLength: Sequelize.INTEGER,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('basecards')
    },
}
