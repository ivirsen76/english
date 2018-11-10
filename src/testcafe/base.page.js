import { Selector, ClientFunction } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { adminUser } from './roles.js'
import { restoreDb, restoreSamples, getRecord, getNumRecords, runQuery } from './db/utils.js'
import { url } from './config.js'

fixture('Bases page')
    .beforeEach(async t => {
        restoreDb()
        restoreSamples()
        await t.useRole(adminUser)
    })
    .afterEach(t => {
        restoreSamples()
    })

const getLocation = ClientFunction(() => window.location.href)

// Selectors
const Title = Selector('h2')
const AddCardButton = Selector('#addCardButton')
const AddCardSubmitButton = Selector('button[type=submit').withText('Добавить слово')
const UpdateCardSubmitButton = Selector('button[type=submit').withText('Update card')
const Alert = ReactSelector('Alert')
const Table = ReactSelector('Table')
const FolderElement = Selector('#elementFolder')
const CardsElement = Selector('#elementCards')
const SaveButton = Selector('#saveButton')
const BaseTitle = Selector('h2#baseTitle')
const BaseSettings = Selector('#baseSettings')
const ListButton = Selector('button').withText('List')
const TableButton = Selector('button').withText('Table')
const Modal = Selector('.ui.modal')

test('Should render base title', async t => {
    await t.navigateTo(url('/user/base'))
    await t.expect(Title.innerText).contains('Bases')
})

test('Should add two folders and cards', async t => {
    await runQuery('DELETE FROM basecards')
    await runQuery('DELETE FROM bases')

    await t.navigateTo(url('/user/base'))
    await t.expect(await SaveButton.classNames).notContains('orange')

    // Add first folder
    await t.click(FolderElement)
    const currentFolder = Selector('.testcafeTreeItem').withText('Folder')
    await t.click(currentFolder)
    await t.expect((await currentFolder.classNames).join(' ')).contains('active')
    await t.expect(getLocation()).contains('/user/base/1000000000')
    await t.expect(await ListButton.classNames).contains('active')

    // Change folder arrange children method
    await t.click(TableButton)
    await t.expect(await TableButton.classNames).contains('active')

    // Change folder title
    await t.typeText('input[name=title]', 'First one', { replace: true })
    await t.expect(Selector('.testcafeTreeItem').withText('First one')).ok()
    await t.expect(BaseTitle.innerText).contains('First one')

    // Change price and info
    await t.click(Selector('label').withText('главная база'))
    await t.typeText('input[name=price]', '100', { replace: true })
    await t.typeText('textarea[name=info]', 'ISBN', { replace: true })
    await t
        .expect(BaseSettings.innerText)
        .contains('Вы сможете загрузить картинку после сохранения')

    // Add other folders
    await t.click(FolderElement)
    await t.click(currentFolder)
    await t.click(CardsElement)
    await t.expect(await SaveButton.classNames).contains('orange')

    // Saving
    await t.click(SaveButton)
    await t.expect(await SaveButton.classNames).notContains('orange')

    // Check the db
    await t.expect(await getNumRecords('bases')).eql(3)
    const parent = await getRecord('bases', {
        title: 'First one',
        arrangeChildren: 'table',
        type: 'folder',
        isMain: 1,
        price: 100,
        info: 'ISBN',
    })
    await t
        .expect(
            await getNumRecords('bases', {
                title: 'Folder',
                arrangeChildren: 'list',
                type: 'folder',
                parentId: parent.id,
            })
        )
        .eql(1)

    // Check that the image is available now
    await t.click(Selector('.testcafeTreeItem').withText('First one'))
    await t.expect(Selector('button').withText('Загрузить картинку').innerText).ok()
    await t.typeText('input[name=title]', 'First new one', { replace: true })
    await t.typeText('input[name=price]', '200', { replace: true })
    await t.typeText('textarea[name=info]', 'newISBN', { replace: true })
    await t.click(ListButton)
    await t.click(SaveButton)

    await t
        .expect(
            await getNumRecords('bases', {
                title: 'First new one',
                arrangeChildren: 'list',
                type: 'folder',
                price: 200,
                info: 'newISBN',
            })
        )
        .eql(1)
})

test('Should add card', async t => {
    const text = 'new card (and more words which should not be in the sound)'
    const translate = 'новая карточка (и еще много всяких слов, которые не должны быть в звуке)'

    await t.navigateTo(url('/user/base/2'))

    await t.click(AddCardButton)
    await t.typeText('input[name=text]', text, { paste: true })
    await t.typeText('input[name=translate]', translate, { paste: true })

    await t.click(AddCardSubmitButton)
    await t.expect(Alert.innerText).contains('has been added')
    await t.expect(Table.innerText).contains(text)
    await t.expect(Table.innerText).contains(translate)

    await t.expect(await getNumRecords('basecards', { baseId: 2, text, translate })).eql(1)

    const record = await getRecord('basecards', { baseId: 2, text, translate })
    await t.expect(record.ukSoundLength).lt(2000)
    await t.expect(record.usSoundLength).lt(2000)
    await t.expect(record.ruSoundLength).lt(2000)
})

test('Should trim spaces before adding', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(AddCardButton)
    await t.typeText('input[name=text]', ' Some word ')
    await t.typeText('input[name=translate]', ' слово ')

    await t.click(AddCardSubmitButton)

    await t
        .expect(await getNumRecords('basecards', { text: 'Some word', translate: 'слово' }))
        .eql(1)
})

test('Should show validation error when adding a card', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(AddCardButton)
    await t.typeText('input[name=text]', 'русский текст')

    await t.click(AddCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text has to be in English')
    await t.expect(Modal.innerText).contains('Translation is required')
})

test('Should show duplication error when adding a card', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(AddCardButton)
    await t.typeText('input[name=text]', ' second ')
    await t.typeText('input[name=translate]', 'слово')

    await t.click(AddCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text already exists')
})

test('Should change cards words', async t => {
    await t.navigateTo(url('/user/base/2'))
    await t.typeText('textarea[name=words]', 'some', { paste: true })
    await t.click(SaveButton)

    await t.expect(await getNumRecords('bases', { id: 2, words: 'some' })).eql(1)
})

test('Should see used words', async t => {
    await t.navigateTo(url('/user/base/2'))
    await t.typeText('textarea[name=words]', 'come on, moreover, Personal, calendar', {
        paste: true,
    })
    await t.expect(Selector('#table_inSentenceWords').innerText).contains('moreover')
    await t.expect(Selector('#table_adjectiveWords').innerText).contains('Personal')
    await t.expect(Selector('#table_otherWords').innerText).contains('come on')
    await t.expect(Selector('#table_otherWords').innerText).notContains('calendar')

    await t.click(AddCardButton)

    await t.expect(Selector('#inSentenceWords').innerText).contains('moreover')
    await t.expect(Selector('#adjectiveWords').innerText).contains('Personal')
    await t.expect(Selector('#otherWords').innerText).contains('come on')
    await t.expect(Selector('#otherWords').innerText).notContains('calendar')

    const Moreover = Selector('#inSentenceWords')
        .find('.ui.label')
        .withText('moreover')
    await t.typeText('input[name=text]', 'Another ')
    await t.click(Moreover)
    await t.expect(Selector('input[name=text]').value).eql('Another moreover')
})

test('Should update card', async t => {
    const text = 'updated card (and more words which should not be in the sound)'
    const translate =
        'обновлённая карточка (и еще много всяких слов, которые не должны быть в звуке)'

    await t.navigateTo(url('/user/base/2'))

    await t.click(Selector('#updateCardButton1'))
    await t.typeText('input[name=text]', text, { paste: true, replace: true })
    await t.typeText('input[name=translate]', translate, { paste: true, replace: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(Alert.innerText).contains('has been updated')
    await t.expect(Table.innerText).contains(text)
    await t.expect(Table.innerText).contains(translate)

    await t.expect(await getNumRecords('basecards', { text, translate })).eql(1)

    const record = await getRecord('basecards', { text, translate })
    await t.expect(record.ukSoundFile).notContains('sample')
    await t.expect(record.usSoundFile).notContains('sample')
    await t.expect(record.ruSoundFile).notContains('sample')
    await t.expect(record.ukSoundLength).lt(2000)
    await t.expect(record.usSoundLength).lt(2000)
    await t.expect(record.ruSoundLength).lt(2000)
})

test('Should strip spaces when updating card', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(Selector('#updateCardButton1'))
    await t.typeText('input[name=text]', ' Second one ', { replace: true })
    await t.typeText('input[name=translate]', ' второй раз ', { replace: true })

    await t.click(UpdateCardSubmitButton)

    await t
        .expect(await getNumRecords('basecards', { text: 'Second one', translate: 'второй раз' }))
        .eql(1)
})

test('Should show duplication error when updating a card', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(Selector('#updateCardButton1'))
    await t.typeText('input[name=text]', ' second ', { replace: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text already exists')
})

test('Should delete card', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(Selector('#deleteCardButton1'))
    await t.expect(Alert.innerText).contains('has been deleted')
    await t.expect(Table.innerText).notContains('first')
    await t.expect(Table.innerText).notContains('первый')

    await t.expect(await getNumRecords('basecards', { text: 'first', translate: 'первый' })).eql(0)
})
