const app = require('../server/app.js')
const colors = require('colors/safe')
const inquirer = require('inquirer')

const getAnswers = () =>
    inquirer.prompt([
        {
            name: 'email',
            message: 'Email:',
        },
        {
            name: 'password',
            message: 'Password:',
        },
        {
            name: 'roles',
            type: 'list',
            message: 'Role:',
            choices: ['admin', 'student'],
        },
    ])

const run = async () => {
    const answers = await getAnswers()

    try {
        await app.getService('users').create(answers)
    } catch (e) {
        const message = e.errors ? e.errors.map(item => item.message).join('\n') : e.message
        console.error(colors.red(message))
        process.exit(1)
    }

    console.info(colors.green('The user has been created'))
    process.exit()
}

run()
