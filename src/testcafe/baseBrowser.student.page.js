import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { studentUser } from './roles.js'
import { restoreDb, getNumRecords } from './db/utils.js'
import { url } from './config.js'

fixture('Bases page').beforeEach(async t => {
    restoreDb()
    await t.useRole(studentUser)
})

// Selectors
const Title = Selector('h2')
const StudentBookLink = Selector('a').withExactText('Pre-intermediate')
const ChapterLink = Selector('a').withText("Who's who?")
const AddCardsButton = Selector('#addCardsFromBaseButton')
const NewWordsCounter = AddCardsButton.find('.ui.label')
const Alert = ReactSelector('Alert')
const Message = Selector('.ui.warning.message')
const Table = ReactSelector('Table')

test('Should render title', async t => {
    await t.navigateTo(url('/bases'))
    await t.expect(Title.innerText).contains('Базы')
})

test('Should add all 8 new words', async t => {
    await t.navigateTo(url('/bases'))
    await t.click(StudentBookLink)
    await t.click(ChapterLink)

    await t.expect(NewWordsCounter.innerText).contains('8')
    await t.expect(Table.innerText).contains('Новое?')
    await t.expect(Table.innerText).contains('calendar')
    await t.expect(Table.innerText).contains('календарь')

    await t.click(AddCardsButton)
    await t.expect(Alert.innerText).contains('Все новые слова добавлены')

    await t.expect(await getNumRecords('cards', { userId: 2 })).eql(16)
    await t.expect(Message.innerText).contains('Все карточки уже добавлены')
})