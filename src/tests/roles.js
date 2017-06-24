import { Role } from 'testcafe'

export const regularUser = Role('http://localhost:3000/login', async t => {
    await t
        .typeText('input[name=email]', 'ivirsen@gmail.com')
        .typeText('input[name=password]', 'password')
        .click('button')
})

