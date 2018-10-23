import { Selector } from 'testcafe'
// import { ReactSelector } from 'testcafe-react-selectors'

fixture('Production tests')

const url = (path = '') => `http://www.word-word.club${path}`

// Selectors
const Title = Selector('h1')

test('Should render home page', async t => {
    await t.navigateTo(url())
    await t.expect(Title.innerText).contains('Слова')
})
