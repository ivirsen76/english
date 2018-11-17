module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.addIndex('bases', ['parentId'])
    },
    down: (queryInterface, Sequelize) => {
        queryInterface.removeIndex('bases', ['parentId'])
    },
}
