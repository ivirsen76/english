module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.addColumn('bases', 'words', {
            type: Sequelize.TEXT('tiny'),
            allowNull: false,
        }),
    down: (queryInterface, Sequelize) => queryInterface.removeColumn('bases', 'words'),
}
