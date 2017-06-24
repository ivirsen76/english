/* global fixture */
import { Selector } from 'testcafe'
import { regularUser } from './roles.js'

fixture('Hello world').page('http://localhost:3000').beforeEach(async t => {
    await t.useRole(regularUser)
})

test('My first test', async t => {
    await t.wait(2000)
    await t.expect(Selector('h2').innerText).eql('Главная')
})
