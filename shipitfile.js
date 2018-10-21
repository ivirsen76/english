/* eslint-disable global-require */
module.exports = shipit => {
    // Load shipit-deploy tasks
    require('shipit-deploy')(shipit)
    const utils = require('shipit-utils')

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

    shipit.blTask('installDeps', async () => {
        await shipit.remote(`cd ${shipit.releasePath} && npm install`)
    })

    shipit.blTask('copyEnv', async () => {
        await shipit.remote(`cp ${shipit.config.deployTo}/.env ${shipit.releasePath}/.env`)
    })

    shipit.blTask('build', async () => {
        await shipit.remote(`cd ${shipit.releasePath} && npm run build`)
    })

    utils.registerTask(shipit, 'deploy', [
        'deploy:init',
        'deploy:fetch',
        'deploy:update',
        'deploy:publish',
        'deploy:clean',
        'deploy:finish',
        'installDeps',
        'copyEnv',
        'build',
    ])
}
