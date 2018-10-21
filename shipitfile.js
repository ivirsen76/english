/* eslint-disable global-require */
const path = require('path')

module.exports = shipit => {
    // Load shipit-deploy tasks
    require('shipit-deploy')(shipit)
    const utils = require('shipit-utils')

    shipit.initConfig({
        default: {
            repositoryUrl: 'git@github.com:ivirsen76/components.git',
            dirToCopy: 'shipit',
            keepReleases: 3,
        },
        production: {
            deployTo: '/var/www/demo.igor-eremeev.com',
            servers: 'admin@185.72.246.95',
        },
    })

    shipit.blTask('cleanReleaseFolder', async () => {
        await shipit.remote(`mv ${shipit.releasePath}/REVISION ${shipit.releasePath}/.REVISION`)
        await shipit.remote(`rm -rf ${shipit.releasePath}/*`)
        return await shipit.remote(
            `mv ${shipit.releasePath}/.REVISION ${shipit.releasePath}/REVISION`
        )
    })

    shipit.blTask('copyBuildFolder', async () => {
        const buildDirectory = path.join(__dirname, 'build')
        return await shipit.remoteCopy(buildDirectory, shipit.releasePath)
    })

    utils.registerTask(shipit, 'deploy', [
        'deploy:init',
        'deploy:fetch',
        'deploy:update',
        'cleanReleaseFolder',
        'copyBuildFolder',
        'deploy:publish',
        'deploy:clean',
        'deploy:finish',
    ])
}
