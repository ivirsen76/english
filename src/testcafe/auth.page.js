import { Selector } from 'testcafe'
import { restoreDb } from './db/utils.js'
import { url } from './config.js'

fixture('Login and Logout').beforeEach(async t => {
    restoreDb()
})

// Selectors
const Body = Selector('body')
const LoginLink = Selector('a').withText('Войти')
const LoginSubmitButton = Selector('button').withText('Войти')
const LogoutLink = Selector('a').withText('Выйти')
const UserMenuLink = Selector('span').withText('admin@gmail.com')

test('Should log in and log out using menu options', async t => {
    await t.navigateTo(url('/'))
    await t.expect(Body.innerText).notContains('admin@gmail.com')

    await t.click(LoginLink)
    await t.typeText('input[name=email]', 'admin@gmail.com', { paste: true })
    await t.typeText('input[name=password]', 'password', { paste: true })
    await t.click(LoginSubmitButton)

    await t.expect(Body.innerText).contains('admin@gmail.com')

    await t.click(UserMenuLink)
    await t.click(LogoutLink)
    await t.expect(Body.innerText).contains('Войти')
})

test('Should log in and log out using pages', async t => {
    await t.navigateTo(url('/login'))
    await t.expect(Body.innerText).notContains('admin@gmail.com')

    await t.typeText('input[name=email]', 'admin@gmail.com', { paste: true })
    await t.typeText('input[name=password]', 'password', { paste: true })
    await t.click(LoginSubmitButton)

    await t.expect(Body.innerText).contains('admin@gmail.com')

    await t.navigateTo(url('/logout'))
    await t.expect(Body.innerText).contains('Войти')
})

test('Should show 404 error for non found page', async t => {
    await t.navigateTo(url('/wrongone'))
    await t.expect(Body.innerText).contains('404 ERROR')
    await t.expect(Body.innerText).contains('Take Me Home')
})
