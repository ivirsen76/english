import { Role, url } from '@ieremeev/app/testcafe'

export const adminUser = Role(url('/login'), async t => {
    await t
        .typeText('input[name=email]', 'admin@gmail.com', { paste: true })
        .typeText('input[name=password]', 'password', { paste: true })
        .click('button')
})

export const studentUser = Role(url('/login'), async t => {
    await t
        .typeText('input[name=email]', 'student@gmail.com', { paste: true })
        .typeText('input[name=password]', 'password', { paste: true })
        .click('button')
})
