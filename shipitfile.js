/* eslint-disable global-require */
module.exports = shipit => {
    // Load shipit-deploy tasks
    require('shipit-deploy')(shipit)

    shipit.initConfig({
        default: {
            repositoryUrl: 'git@github.com:ivirsen76/english.git',
            keepReleases: 3,
        },
        production: {
            deployTo: '/home/admin/sites/word-word',
            servers: 'admin@185.72.246.73',
        },
    })
}
