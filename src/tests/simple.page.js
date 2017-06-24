/* global fixture */
import { Selector } from 'testcafe'
import { regularUser } from './roles.js'

fixture('Hello world').beforeEach(async t => {
    await t.useRole(regularUser)
})

test('My first test', async t => {
    await t.page('http://localhost:3000')
    await t.wait(2000)
    await t.expect(Selector('h2').innerText).eql('Главная')
})
