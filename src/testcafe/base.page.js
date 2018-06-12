/* global fixture */
import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { regularUser } from './roles.js'
import { restoreDb, getNumRecords } from './db/utils.js'

fixture('Bases page').beforeEach(async t => {
    restoreDb()
    await t.useRole(regularUser)
})

// Selectors
const Body = Selector('#body')
const Title = Selector('h2')
const AddBaseButton = Selector('#addBaseButton')
const AddBaseSubmitButton = Selector('#addBaseSubmitButton')
const AddCardButton = Selector('#addCardButton')
const AddCardSubmitButton = Selector('button[type=submit').withText('Add card')
const Breadcrumb = Selector('.breadcrumb')
const Alert = ReactSelector('Alert')
const Table = ReactSelector('Table')

test('Should render base title', async t => {
    await t.navigateTo('http://localhost:9000/user/base')
    await t.expect(Title.innerText).contains('Bases')
})

test('Should add base as folder', async t => {
    await t.navigateTo('http://localhost:9000/user/base')
    await t.click(AddBaseButton)
    await t.typeText('input[name=title]', 'English file', { replace: true })

    await t.click(AddBaseSubmitButton)
    await t.expect(Alert.innerText).contains('Base has been added')
    await t.expect(Table.innerText).contains('English file')

    await t.expect(await getNumRecords('bases', { title: 'English file' })).eql(1)

    await t.click(Selector('a').withText('English file'))
    await t.expect(Body.innerText).contains('Add base')
})

test('Should add base as cards', async t => {
    const select = Selector('select[name=type]')
    const selectOption = select.find('option')

    await t.navigateTo('http://localhost:9000/user/base')
    await t.click(AddBaseButton)
    await t.typeText('input[name=title]', 'English file', { replace: true })
    await t.click(select)
    await t.click(selectOption.withText('Cards'))

    await t.click(AddBaseSubmitButton)

    await t.click(Selector('a').withText('English file'))
    await t.expect(Body.innerText).contains('Add card')
})

test('Should show breadcrumbs and cards', async t => {
    await t.navigateTo('http://localhost:9000/user/base/2')
    await t.expect(Breadcrumb.innerText).contains('Bases')
    await t.expect(Breadcrumb.innerText).contains('face2face')
    await t.expect(Breadcrumb.innerText).contains('Chapter 1')
    await t.expect(Table.innerText).contains('first')
})

test('Should add card', async t => {
    await t.navigateTo('http://localhost:9000/user/base/2')

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
