import { Selector } from 'testcafe'
import { studentUser } from './roles.js'
import { restoreDb } from './db/utils.js'
import { url } from './config.js'

fixture('Student interface').beforeEach(async t => {
    restoreDb()
    await t.useRole(studentUser)
    await t.navigateTo(url('/user/cards'))
})

// Selectors
const Title = Selector('h2')
const SideMenu = Selector('#sideMenu')

test('Should not see admin stuff', async t => {
    await t.expect(Title.innerText).contains('Мои слова')
    await t.expect(SideMenu.innerText).contains('Мои слова')
    await t.expect(SideMenu.innerText).contains('Добавить из баз')
    await t.expect(SideMenu.innerText).contains('Запомнить')
    await t.expect(SideMenu.innerText).contains('Написать')
    await t.expect(SideMenu.innerText).notContains('Скачать MP3')
    await t.expect(SideMenu.innerText).notContains('Базы')
    await t.expect(SideMenu.innerText).notContains('Статистика')
})

test('Should go to remember page without global clicking', async t => {
    await t.click(Selector('#rememberMenuItem'))
    await t.expect(Selector('#globalPlayButton').exists).notOk()
})

test('Should go to write page without global clicking', async t => {
    await t.click(Selector('#writeMenuItem'))
    await t.expect(Selector('#globalPlayButton').exists).notOk()
})
