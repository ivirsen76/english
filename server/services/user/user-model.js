const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    const user = sequelize.define(
        'users',
        {
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    )

    return user
}
