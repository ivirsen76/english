import { Role } from 'testcafe'

export const regularUser = Role('http://localhost:3000/login', async t => {
    await t
        .typeText('input[name=email]', 'ivirsen@gmail.com', { paste: true })
        .typeText('input[name=password]', 'password', { paste: true })
        .click('button')
})

