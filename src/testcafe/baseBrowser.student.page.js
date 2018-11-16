import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { studentUser } from './roles.js'
import { restoreDb, getNumRecords } from './db/utils.js'
import { url } from './config.js'

fixture('Base browser for students').beforeEach(async t => {
    restoreDb()
    await t.useRole(studentUser)
})

// Selectors
const Title = Selector('h2')
const StudentBookLink = Selector('a').withExactText('Pre-intermediate')
const ChapterLink1 = Selector('a').withText("Who's who?")
const ChapterLink2 = Selector('a').withText('Who knows you better?')
const AddCardsButton = Selector('#addCardsFromBaseButton')
const NewWordsCounter = AddCardsButton.find('.ui.label')
const Alert = ReactSelector('Alert')
const Message = Selector('.ui.warning.message')
const Table = ReactSelector('Table')

test('Should render title', async t => {
    await t.navigateTo(url('/bases'))
    await t.expect(Title.innerText).contains('Базы')
})

test('Should add all 7 new words', async t => {
    await t.navigateTo(url('/bases'))
    await t.click(StudentBookLink)
    await t.click(ChapterLink2)
    await t.expect(NewWordsCounter.innerText).contains('1')

    await t.click(StudentBookLink)
    await t.click(ChapterLink1)
    await t.expect(NewWordsCounter.innerText).contains('7')
    await t.expect(Table.innerText).contains('Новое?')
    await t.expect(Table.innerText).contains('calendar')
    await t.expect(Table.innerText).contains('календарь')

    await t.click(AddCardsButton)
    await t.expect(Alert.innerText).contains('Все новые слова добавлены')

    await t.expect(await getNumRecords('cards', { userId: 2 })).eql(15)
    await t
        .expect(
            await getNumRecords('cards', {
                userId: 2,
                text: 'sevens-teen',
                translate: 'седьмой',
                label: 'chapter1',
            })
        )
        .eql(1)
    await t.expect(Message.innerText).contains('Все карточки уже добавлены')
})
