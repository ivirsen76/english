import { Selector } from 'testcafe'
// import { ReactSelector } from 'testcafe-react-selectors'
import { studentUser } from './roles.js'
import { restoreDb } from './db/utils.js'
import { url } from './config.js'

fixture('Bases page').beforeEach(async t => {
    restoreDb()
    await t.useRole(studentUser)
})

// Selectors
const Title = Selector('h2')
// const Alert = ReactSelector('Alert')
// const Table = ReactSelector('Table')

test('Should render title', async t => {
    await t.navigateTo(url('/bases'))
    await t.expect(Title.innerText).contains('Базы')
})
