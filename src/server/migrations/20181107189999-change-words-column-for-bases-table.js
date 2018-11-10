module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.changeColumn('bases', 'words', {
            type: Sequelize.TEXT('medium'),
            allowNull: false,
        }),
    down: (queryInterface, Sequelize) => {},
}
