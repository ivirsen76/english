/* eslint-disable global-require */
module.exports = shipit => {
    // Load shipit-deploy tasks
    require('shipit-deploy')(shipit)
    const utils = require('shipit-utils')

    shipit.initConfig({
        default: {
            repositoryUrl: 'git@github.com:ivirsen76/english.git',
            keepReleases: 3,
            ignores: ['.git', 'node_modules', 'build'],
        },
        production: {
            deployTo: '/home/admin/sites/word-word',
            servers: 'admin@185.72.246.73',
        },
    })

    shipit.blTask('prepareBuild', async () => {
        await shipit.remote(`cd ${shipit.releasePath} && npm install`)
        await shipit.remote(`cp ${shipit.config.deployTo}/.env ${shipit.releasePath}/.env`)
        await shipit.remote(`cd ${shipit.releasePath} && npm run build`)
    })

    shipit.blTask('stopOldServer', async () => {
        await shipit.remote(`pm2 stop word-word`)
    })

    shipit.blTask('startNewServer', async () => {
        await shipit.remote(`cd ${shipit.releasePath} && npm run migrate`)
        await shipit.remote(`pm2 start word-word`)
    })

    utils.registerTask(shipit, 'deploy', [
        'deploy:init',
        'deploy:fetch',
        'deploy:update',
        'prepareBuild',
        'stopOldServer',
        'deploy:publish',
        'startNewServer',
        'deploy:clean',
        'deploy:finish',
    ])
}
