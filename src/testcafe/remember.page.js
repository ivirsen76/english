import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { studentUser } from './roles.js'
import { restoreDb, restoreSamples, getNumRecords, runQuery } from './db/utils.js'
import { url } from './config.js'

fixture('Remember page').beforeEach(async t => {
    restoreDb()
    restoreSamples()
    await t.useRole(studentUser)
    await t.navigateTo(url('/user/remember'))
    await t.click(Selector('#globalPlayButton'))
})

// Selectors
const Body = Selector('body')
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
const DeleteButton = ReactSelector('DeleteButton')
const EditSubmitButton = Selector('button').withText('Update card')
const Alert = ReactSelector('Alert')
const RememberTotalBadge = Selector('#rememberTotal')

test('Should show no cards message', async t => {
    await runQuery('DELETE FROM cards')

    // Reload the page just to update the data in redux
    await t.eval(() => location.reload(true))
    await t.click(Selector('#globalPlayButton'))

    await t.expect(Body.innerText).contains('Слов для запоминания нет')
})

test('Should render right counter', async t => {
    await t.expect(Counter.innerText).contains('1 / 5')
})

test('Should filter list using existing label', async t => {
    await t.typeText(Label, 'test')
    await t.expect(Counter.innerText).contains('1 / 2')
})

test('Should filter list using unknown label', async t => {
    await t.typeText(Label, 'unknown')
    await t.expect(RememberTotalBadge.innerText).contains('5')
    await t.expect(RememberPage.innerText).contains('No cards to show')
})

test('Should go to the next card', async t => {
    await t.expect(PanelRu.innerText).contains('текст')
    await t.expect(PanelUs.innerText).notContains('text')

    await t.click(NextButton)
    await t.expect(PanelUs.innerText).contains('text')

    await t.click(NextButton)
    await t.expect(Counter.innerText).contains('2 / 5')
    await t.expect(PanelRu.innerText).contains('блок')
    await t.expect(PanelUs.innerText).notContains('block')
})

test('Should go to the next card when pressing space', async t => {
    await t.expect(PanelUs.innerText).notContains('text')
    await t.pressKey('space')
    await t.expect(PanelUs.innerText).contains('text')
})

test('Should go to the next card with filter', async t => {
    await t.typeText(Label, 'alone')
    await t.expect(Counter.innerText).contains('1 / 1')

    await t.click(NextButton)
    await t.click(NextButton)
    await t.expect(Counter.innerText).contains('1 / 1')
})

test('Should remember card', async t => {
    await t.expect(PanelRu.innerText).contains('текст')

    await t.click(DoneButton)
    await t.expect(PanelRu.innerText).contains('блок')
    await t.expect(Counter.innerText).contains('1 / 4')

    await t.expect(await getNumRecords('cards', { translate: 'т`екст', status: 1 })).eql(1)
})

test('Should start playing', async t => {
    await t.click(NextButton)
    await t.expect(PanelRu.innerText).contains('текст')

    await t.click(PlayButton)
    await t.expect(PanelUs.innerText).contains('block')
})

test('Should switch panels', async t => {
    await t.expect(PanelRu.innerText).contains('текст')
    await t.expect(PanelUs.innerText).notContains('text')

    await t.click(SwitchButton)
    await t.expect(PanelRu.innerText).notContains('текст')
    await t.expect(PanelUs.innerText).contains('text')
})

test('Should edit card', async t => {
    await t.click(EditButton)
    await t.typeText('input[name=text]', 'some one', { replace: true })
    await t.typeText('input[name=translate]', 'что-то еще', { replace: true })

    await t.click(EditSubmitButton)
    await t.expect(Alert.innerText).contains('has been updated')
    await t.click(NextButton)

    await t.expect(PanelUs.innerText).contains('some one')
    await t.expect(PanelRu.innerText).contains('что-то еще')

    await t
        .expect(await getNumRecords('cards', { text: 'some one', translate: 'что-то еще' }))
        .eql(1)
})

test('Should delete card', async t => {
    await t.click(DeleteButton)
    await t.expect(PanelRu.innerText).contains('блок')
    await t.expect(Counter.innerText).contains('1 / 4')

    await t.expect(await getNumRecords('cards', { translate: 'т`екст' })).eql(0)
})
