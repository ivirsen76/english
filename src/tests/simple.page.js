/* global fixture */
import { Selector } from 'testcafe'
import ReactSelector from 'testcafe-react-selectors'
import { regularUser } from './roles.js'
import restoreDb from './db/restoreDb.js'

fixture('Remember page').beforeEach(async t => {
    restoreDb()
    await t.useRole(regularUser)
    await t.navigateTo('http://localhost:3000/user/remember')
})

// Selectors
const Counter = ReactSelector('Counter')
const Label = ReactSelector('Label').find('input')
const RememberPage = ReactSelector('RememberPage')
const PanelUs = Selector('#panel_us_word')
const PanelRu = Selector('#panel_ru_word')
const NextButton = ReactSelector('NextButton')
const DoneButton = ReactSelector('DoneButton')

test('Should render right counter', async t => {
    await t.expect(Counter.innerText).contains('1 / 5')
})

test('Should filter list using existing label', async t => {
    await t.typeText(Label, 'test')
    await t.expect(Counter.innerText).contains('1 / 2')
})

test('Should filter list using unknown label', async t => {
    await t.typeText(Label, 'unknown')
    await t.expect(RememberPage.innerText).contains('No cards to show')
})

test('Should go to the next card', async t => {
    await t.expect(PanelUs.innerText).contains('text')
    await t.expect(PanelRu.innerText).notContains('текст')

    await t.click(NextButton)
    await t.expect(PanelRu.innerText).contains('текст')

    await t.click(NextButton)
    await t.expect(PanelUs.innerText).contains('block')
    await t.expect(PanelRu.innerText).notContains('блок')
})

test('Should remember card', async t => {
    await t.expect(PanelUs.innerText).contains('text')

    await t.click(DoneButton)
    await t.expect(PanelUs.innerText).contains('block')
    await t.expect(Counter.innerText).contains('1 / 4')
})
