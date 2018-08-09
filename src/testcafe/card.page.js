/* global fixture */
import { Selector } from 'testcafe'
import { regularUser } from './roles.js'
import { restoreDb } from './db/utils.js'
import { baseUrl } from './config.js'

fixture('Bases page').beforeEach(async t => {
    restoreDb()
    await t.useRole(regularUser)
    await t.navigateTo(`${baseUrl}/user/cards`)
})

// Selectors
const Modal = Selector('.ui.modal')
const AddCardButton = Selector('#addCardButton')
const UpdateCardSubmitButton = Selector('button[type=submit').withText('Update card')
const AddCardSubmitButton = Selector('button[type=submit').withText('Add card')

test('Should show duplication error when adding a card', async t => {
    await t.click(AddCardButton)
    await t.typeText('input[name=text]', 'text')
    await t.typeText('input[name=translate]', 'перевод')

    await t.click(AddCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text already exists')
})

test('Should show duplication error when editing a card', async t => {
    await t.click(Selector('#updateCardButton19'))
    await t.typeText('input[name=text]', 'text', { replace: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text already exists')
})
