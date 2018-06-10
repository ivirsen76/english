const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    const basecard = sequelize.define(
        'basecards',
        {
            baseId: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        },
        {
            freezeTableName: true,
        }
    )

    return basecard
}
