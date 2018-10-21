import { Selector } from 'testcafe'
import { studentUser } from './roles.js'
import { restoreDb, restoreSamples, getNumRecords } from './db/utils.js'
import { url } from './config.js'
import { ReactSelector } from 'testcafe-react-selectors'

fixture('Cards page').beforeEach(async t => {
    restoreDb()
    restoreSamples()
    await t.useRole(studentUser)
    await t.navigateTo(url('/user/cards'))
})

// Selectors
const Modal = Selector('.ui.modal')
const AddCardButton = Selector('button').withText('Добавить слово')
const UpdateCardSubmitButton = Selector('button[type=submit').withText('Update card')
const AddCardSubmitButton = Selector('button[type=submit').withText('Добавить слово')
const TextInput = Selector('input[name=text]')
const TranslateInput = Selector('input[name=translate]')
const Alert = ReactSelector('Alert')
const Table = ReactSelector('Table')
const CardTotalBadge = Selector('#cardTotal')

test('Should check environment', async t => {
    await t.expect(CardTotalBadge.innerText).contains('8')
})

test('Should show validation error when adding a card', async t => {
    await t.click(AddCardButton)
    await t.typeText(TextInput, 'русский текст')

    await t.click(AddCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text has to be in English')
    await t.expect(Modal.innerText).contains('Translation is required')
})

test('Should show duplication error when adding a card', async t => {
    await t.click(AddCardButton)
    await t.typeText(TextInput, 'text')
    await t.typeText(TranslateInput, 'перевод')

    await t.click(AddCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text already exists')
})

test('Should add card', async t => {
    await t.click(AddCardButton)
    await t.typeText(TextInput, 'new card')
    await t.typeText(TranslateInput, 'новая карточка')

    await t.click(AddCardSubmitButton)
    await t.expect(Alert.innerText).contains('has been added')
    await t.expect(Table.innerText).contains('new card')
    await t.expect(Table.innerText).contains('новая карточка')
    await t.expect(CardTotalBadge.innerText).contains('9')

    await t
        .expect(await getNumRecords('cards', { text: 'new card', translate: 'новая карточка' }))
        .eql(1)
})

test('Should show validation error when updating card', async t => {
    await t.click(Selector('#updateCardButton19'))
    await t.typeText(TextInput, 'русский текст', { replace: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text has to be in English')
})

test('Should show duplication error when editing a card', async t => {
    await t.click(Selector('#updateCardButton19'))
    await t.typeText(TextInput, 'text', { replace: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text already exists')
})

test('Should update card', async t => {
    await t.click(Selector('#updateCardButton19'))
    await t.typeText(TextInput, 'updated card', { replace: true })
    await t.typeText(TranslateInput, 'обновленная карточка', { replace: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(Alert.innerText).contains('has been updated')
    await t.expect(Table.innerText).contains('updated card')
    await t.expect(Table.innerText).contains('обновленная карточка')

    await t
        .expect(
            await getNumRecords('cards', {
                text: 'updated card',
                translate: 'обновленная карточка',
            })
        )
        .eql(1)
})

test('Should delete card', async t => {
    await t.click(Selector('#deleteCardButton19'))

    await t.expect(Table.innerText).notContains('block')
    await t.expect(Table.innerText).notContains('блок')
    await t.expect(CardTotalBadge.innerText).contains('7')

    await t.expect(await getNumRecords('cards', { text: 'block', translate: 'блок' })).eql(0)
})
