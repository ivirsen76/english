import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { adminUser } from './roles.js'
import { restoreDb, getNumRecords } from './db/utils.js'
import { url } from './config.js'

fixture('Bases page').beforeEach(async t => {
    restoreDb()
    await t.useRole(adminUser)
})

// Selectors
const Title = Selector('h2')
const AddCardButton = Selector('#addCardButton')
const AddCardSubmitButton = Selector('button[type=submit').withText('Add card')
const UpdateCardSubmitButton = Selector('button[type=submit').withText('Update card')
const Alert = ReactSelector('Alert')
const Table = ReactSelector('Table')

test('Should render base title', async t => {
    await t.navigateTo(url('/user/base'))
    await t.expect(Title.innerText).contains('Bases')
})

test('Should add card', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(AddCardButton)
    await t.typeText('input[name=text]', 'Some word')
    await t.typeText('input[name=translate]', 'слово')

    await t.click(AddCardSubmitButton)
    await t.expect(Alert.innerText).contains('has been added')
    await t.expect(Table.innerText).contains('Some word')

    await t
        .expect(await getNumRecords('basecards', { text: 'Some word', translate: 'слово' }))
        .eql(1)
})

test('Should edit card', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(Selector('#updateCardButton1'))
    await t.typeText('input[name=text]', 'Second one', { replace: true })
    await t.typeText('input[name=translate]', 'второй раз', { replace: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(Alert.innerText).contains('has been updated')
    await t.expect(Table.innerText).contains('Second one')
    await t.expect(Table.innerText).contains('второй раз')

    await t
        .expect(await getNumRecords('basecards', { text: 'Second one', translate: 'второй раз' }))
        .eql(1)
})

test('Should delete card', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(Selector('#deleteCardButton1'))
    await t.expect(Alert.innerText).contains('has been deleted')
    await t.expect(Table.innerText).notContains('first')
    await t.expect(Table.innerText).notContains('первый')

    await t.expect(await getNumRecords('basecards', { text: 'first', translate: 'первый' })).eql(0)
})
