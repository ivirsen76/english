import { Selector, ClientFunction } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { adminUser } from './roles.js'
import { restoreDb, restoreSamples, getNumRecords, runQuery } from './db/utils.js'
import { url } from './config.js'

fixture('Bases page').beforeEach(async t => {
    restoreDb()
    restoreSamples()
    await t.useRole(adminUser)
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

    // Change folder title
    await t.typeText('input[name=title]', 'First one', { replace: true })
    await t.expect(Selector('.testcafeTreeItem').withText('First one')).ok()
    await t.expect(BaseTitle.innerText).contains('First one')

    // Add other folders
    await t.click(FolderElement)
    await t.click(currentFolder)
    await t.click(CardsElement)
    await t.expect(await SaveButton.classNames).contains('orange')

    // Saving
    await t.click(SaveButton)
    await t.expect(await SaveButton.classNames).notContains('orange')
    await t.expect(await getNumRecords('bases')).eql(3)
})

test('Should add card', async t => {
    await t.navigateTo(url('/user/base/2'))

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

test('Should edit card', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(Selector('#updateCardButton1'))
    await t.typeText('input[name=text]', 'Second one', { replace: true })
    await t.typeText('input[name=translate]', 'второй раз', { replace: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(Alert.innerText).contains('has been updated')
    await t.expect(Table.innerText).contains('Second one')
    await t.expect(Table.innerText).contains('второй раз')

    await t
        .expect(await getNumRecords('basecards', { text: 'Second one', translate: 'второй раз' }))
        .eql(1)
})

test('Should delete card', async t => {
    await t.navigateTo(url('/user/base/2'))

    await t.click(Selector('#deleteCardButton1'))
    await t.expect(Alert.innerText).contains('has been deleted')
    await t.expect(Table.innerText).notContains('first')
    await t.expect(Table.innerText).notContains('первый')

    await t.expect(await getNumRecords('basecards', { text: 'first', translate: 'первый' })).eql(0)
})
