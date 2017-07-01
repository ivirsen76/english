module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('cards', 'writeRightAttemps', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        })
        await queryInterface.addColumn('cards', 'writeLastDate', Sequelize.DATE)
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('cards', 'writeRightAttemps')
        await queryInterface.removeColumn('cards', 'writeLastDate')
    },
}
