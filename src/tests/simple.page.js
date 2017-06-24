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
const PlayButton = ReactSelector('PlayButton')
const SwitchButton = ReactSelector('SwitchButton')
const EditButton = ReactSelector('EditButton')
const EditSubmitButton = Selector('button').withText('Изменить')
const Alert = ReactSelector('Alert')

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

test('Should start playing', async t => {
    await t.click(NextButton)
    await t.expect(PanelRu.innerText).contains('текст')

    await t.click(PlayButton)
    await t.expect(PanelUs.innerText).contains('block')
})

test('Should switch panels', async t => {
    await t.expect(PanelUs.innerText).contains('text')
    await t.expect(PanelRu.innerText).notContains('текст')

    await t.click(SwitchButton)
    await t.expect(PanelUs.innerText).notContains('text')
    await t.expect(PanelRu.innerText).contains('текст')
})

test('Should edit card', async t => {
    await t.click(EditButton)
    await t.typeText('input[name=text]', 'some', { replace: true })
    await t.typeText('input[name=translate]', 'что-то', { replace: true })

    await t.click(EditSubmitButton)
    await t.expect(Alert.innerText).contains('Карточка обновлена')
    await t.click(NextButton)

    await t.expect(PanelUs.innerText).contains('some')
    await t.expect(PanelRu.innerText).contains('что-то')
})
