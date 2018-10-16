import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { restoreDb } from './db/utils.js'
import { url } from './config.js'

fixture('Bases page').beforeEach(async t => {
    restoreDb()
})

// Selectors
const Title = Selector('h2')
const StudentBookLink = Selector('a').withExactText('Pre-intermediate')
const ChapterLink = Selector('a').withText("Who's who?")
const AddCardsButton = Selector('#addCardsFromBaseButton')
const Table = ReactSelector('Table')

test('Should render title', async t => {
    await t.navigateTo(url('/bases'))
    await t.expect(Title.innerText).contains('Базы')
})

test('Should not see the AddCardsButton', async t => {
    await t.navigateTo(url('/bases'))
    await t.click(StudentBookLink)
    await t.click(ChapterLink)

    await t.expect(AddCardsButton.exists).notOk()
    await t.expect(Table.innerText).notContains('Новое?')
    await t.expect(Table.innerText).contains('calendar')
})
