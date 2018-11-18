import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { studentUser } from './roles.js'
import { restoreDb, restoreSamples, runQuery, getRecord } from './db/utils.js'
import { url } from './config.js'
import { isAudioPlaying } from './helpers.js'

fixture('Write page').beforeEach(async t => {
    restoreDb()
    restoreSamples()
    await t.useRole(studentUser)
    await t.navigateTo(url('/user/write'))
    await t.click(Selector('#globalPlayButton'))
})

// Selectors
const Body = Selector('body')
const Counter = ReactSelector('Counter')
const Input = ReactSelector('InputField')
const NextButton = ReactSelector('NextButton')
const Result = Selector('#result')
const RightText = Selector('#rightText')
const Translate = Selector('#translate')
const Alert = ReactSelector('Alert')

test('Should show no cards message', async t => {
    await runQuery('DELETE FROM cards')

    // Reload the page just to update the data in redux
    await t.eval(() => window.location.reload(true))
    await t.click(Selector('#globalPlayButton'))

    await t.expect(Body.innerText).contains('Слов для написания нет')
})

test('Should go to the next word', async t => {
    await t.expect(isAudioPlaying()).ok()
    await t.expect(Counter.innerText).contains('1 / 3')
    await t.typeText(Input, 'Person')
    await t.pressKey('enter')
    await t.expect(Result.innerText).contains('Person')
    await t.expect((await Result.classNames).join('')).contains('positive')
    await t.expect(RightText.innerText).contains('person')
    await t.expect(Translate.innerText).contains('человек')

    await t.pressKey('enter')
    await t.expect(Counter.innerText).contains('2 / 3')
    await t.typeText(Input, 'some')
})

test('Should go to the next word after clicking the button', async t => {
    await t.typeText(Input, 'Wrong')
    await t.click(NextButton)
    await t.expect(Result.innerText).contains('Wrong')
    await t.expect((await Result.classNames).join('')).contains('negative')

    await t.click(NextButton)
    await t.typeText(Input, 'some')
})

test('Should not go to the next step if there is not input yet', async t => {
    await t.click(NextButton)
    await t.typeText(Input, 'some')
})

test('Should go to the last word in set', async t => {
    await t.typeText(Input, 'Person')
    await t.click(NextButton)
    await t.click(NextButton)

    await t.typeText(Input, 'Car')
    await t.click(NextButton)
    await t.click(NextButton)

    await t.typeText(Input, 'Wrong')
    await t.click(NextButton)

    await t.expect(Alert.innerText).contains('Correct 2 of 3')
    const record = await getRecord('cards', {
        text: 'p`erson (some)',
        writeRightAttempts: 3,
        status: 2,
    })
    await t.expect(record).ok()
    await t.expect(record.writeLastDate.toString().length).gt(10)
})
