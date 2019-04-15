import { Selector, ReactSelector, url } from '@ieremeev/app/testcafe'
import { restoreDb, getNumRecords, getRecord, expectRecordToExist } from '@ieremeev/app/db'
import { studentUser } from './roles.js'
import { restoreSamples, isAudioPlaying } from './helpers.js'

fixture('Cards page')
    .beforeEach(async t => {
        restoreDb()
        restoreSamples()
        await t.useRole(studentUser)
        await t.navigateTo(url('/user/cards'))
    })
    .afterEach(t => {
        restoreSamples()
    })

// Selectors
const Modal = Selector('.ui.modal')
const AddCardButton = Selector('button').withText('Добавить слово')
const UpdateCardSubmitButton = Selector('button[type=submit').withText('Update card')
const AddCardSubmitButton = Selector('button[type=submit').withText('Добавить слово')
const TextInput = Selector('input[name=text]')
const TranslateInput = Selector('input[name=translate]')
const Alert = ReactSelector('Alert')
const Table = ReactSelector('Table')
const CardTotalBadge = Selector('#cardTotal')
const RememberTotalBadge = Selector('#rememberTotal')
const WriteTotalBadge = Selector('#writeTotal')

test('Should check environment', async t => {
    await t.expect(CardTotalBadge.innerText).contains('8')
    await t.expect(RememberTotalBadge.innerText).contains('5')
    await t.expect(WriteTotalBadge.innerText).contains('3')
})

test('Should check that audio is playing', async t => {
    await t.click(Selector('a').withText('calendar'))
    await t.expect(isAudioPlaying()).ok()
})

test('Should show validation error when adding a card', async t => {
    await t.click(AddCardButton)
    await t.typeText(TextInput, 'русский текст')

    await t.click(AddCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text has to be in English')
    await t.expect(Modal.innerText).contains('Translation is required')
})

test('Should show duplication error when adding a card', async t => {
    await t.click(AddCardButton)
    await t.typeText(TextInput, ' text ')
    await t.typeText(TranslateInput, 'перевод')

    await t.click(AddCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text already exists')
})

test('Should add card', async t => {
    const text = 'new card (and more words which should not be in the sound)'
    const translate = 'новая к`арточка (и еще много всяких слов, которые не должны быть в звуке)'

    await t.click(AddCardButton)
    await t.typeText(TextInput, text, { paste: true })
    await t.typeText(TranslateInput, translate, { paste: true })

    await t.click(AddCardSubmitButton)
    await t.expect(isAudioPlaying()).ok()
    await t.expect(Alert.innerText).contains('has been added')
    await t.expect(Table.innerText).contains(text)
    await t.expect(Table.innerText).contains(translate.replace(/`/g, ''))
    await t.expect(CardTotalBadge.innerText).contains('9')

    await t.expect(await getNumRecords('cards', { text, translate })).eql(1)

    const record = await getRecord('cards', { text, translate })
    await t.expect(record.ukSoundLength).lt(2000)
    await t.expect(record.usSoundLength).lt(2000)
    await t.expect(record.ruSoundLength).lt(2000)
})

test('Should add card with duplicate symbols and replace them', async t => {
    const text = 'Diane – she’s so generous.'
    const translate = 'символ'

    await t.click(AddCardButton)
    await t.typeText(TextInput, text, { paste: true })
    await t.typeText(TranslateInput, translate, { paste: true })

    await t.click(AddCardSubmitButton)
    await t.expect(Alert.innerText).contains('has been added')

    await expectRecordToExist('cards', { text: "Diane - she's so generous." })
})

test('Should strip spaces when adding card', async t => {
    await t.click(AddCardButton)
    await t.typeText(TextInput, ' new card ', { paste: true })
    await t.typeText(TranslateInput, ' новая карточка ', { paste: true })

    await t.click(AddCardSubmitButton)
    await t
        .expect(await getNumRecords('cards', { text: 'new card', translate: 'новая карточка' }))
        .eql(1)
})

test('Should show validation error when updating card', async t => {
    await t.click(Selector('#updateCardButton19'))
    await t.typeText(TextInput, 'русский текст', { replace: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text has to be in English')
})

test('Should show duplication error when updating a card', async t => {
    await t.click(Selector('#updateCardButton19'))
    await t.typeText(TextInput, ' text ', { replace: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(Modal.innerText).contains('Text already exists')
})

test('Should update card', async t => {
    const text = 'updated card (and more words which should not be in the sound)'
    const translate =
        'обновлённая карточка (и еще много всяких слов, которые не должны быть в звуке)'

    await t.click(Selector('#updateCardButton19'))
    await t.typeText(TextInput, text, { replace: true, paste: true })
    await t.typeText(TranslateInput, translate, { replace: true, paste: true })

    await t.click(UpdateCardSubmitButton)
    await t.expect(isAudioPlaying()).ok()
    await t.expect(Alert.innerText).contains('has been updated')
    await t.expect(Table.innerText).contains(text)
    await t.expect(Table.innerText).contains(translate)

    await t.expect(await getNumRecords('cards', { text, translate })).eql(1)

    const record = await getRecord('cards', { text, translate })
    await t.expect(record.ukSoundFile).notContains('sample')
    await t.expect(record.usSoundFile).notContains('sample')
    await t.expect(record.ruSoundFile).notContains('sample')
    await t.expect(record.ukSoundLength).lt(2000)
    await t.expect(record.usSoundLength).lt(2000)
    await t.expect(record.ruSoundLength).lt(2000)
})

test('Should strip spaces when updating card', async t => {
    await t.click(Selector('#updateCardButton19'))
    await t.typeText(TextInput, ' updated card ', { replace: true, paste: true })
    await t.typeText(TranslateInput, ' обновлённая карточка ', { replace: true, paste: true })

    await t.click(UpdateCardSubmitButton)
    await t
        .expect(
            await getNumRecords('cards', {
                text: 'updated card',
                translate: 'обновлённая карточка',
            })
        )
        .eql(1)
})

test('Should replace duplicate symbols', async t => {
    await t.click(Selector('#updateCardButton19'))
    await t.typeText(TextInput, 'Diane – she’s so generous.', { replace: true, paste: true })
    await t.click(UpdateCardSubmitButton)

    await expectRecordToExist('cards', { text: "Diane - she's so generous." })
})

test('Should delete card', async t => {
    await t.click(Selector('#deleteCardButton19'))

    await t.expect(Table.innerText).notContains('block')
    await t.expect(Table.innerText).notContains('блок')
    await t.expect(CardTotalBadge.innerText).contains('7')

    await t.expect(await getNumRecords('cards', { text: 'block', translate: 'блок' })).eql(0)
})
