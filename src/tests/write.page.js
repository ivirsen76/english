/* global fixture */
import { Selector } from 'testcafe'
import ReactSelector from 'testcafe-react-selectors'
import { regularUser } from './roles.js'
import { restoreDb } from './db/utils.js'

fixture('Write page').beforeEach(async t => {
    restoreDb()
    await t.useRole(regularUser)
    await t.navigateTo('http://localhost:3000/user/write')
})

// Selectors
const Counter = ReactSelector('Counter')
const Input = ReactSelector('InputField')
const NextButton = ReactSelector('NextButton')
const Result = Selector('#result')
const RightText = Selector('#rightText')
const Translate = Selector('#translate')

test('Should go to the next word', async t => {
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
