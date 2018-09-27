import { Role } from 'testcafe'
import { url } from './config.js'

export const regularUser = Role(url('/login'), async t => {
    await t
        .typeText('input[name=email]', 'admin@gmail.com', { paste: true })
        .typeText('input[name=password]', 'password', { paste: true })
        .click('button')
})
