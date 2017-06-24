/* global fixture */
import ReactSelector from 'testcafe-react-selectors'
import { regularUser } from './roles.js'
import restoreDb from './db/restoreDb.js'

fixture('Hello world').beforeEach(async t => {
    restoreDb()
    await t.useRole(regularUser)
    await t.navigateTo('http://localhost:3000/user/remember')
})

test('Should render right counter', async t => {
    await t.expect(ReactSelector('Counter').innerText).contains('1 / 5')
})
