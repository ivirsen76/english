import { Selector, ClientFunction } from 'testcafe'

fixture('Production tests')

const isSentry = ClientFunction(() => window.ieremeev && window.ieremeev.sentry)
const url = (path = '') => `http://www.word-word.club${path}`

// Selectors
const TitleH1 = Selector('h1')
const TitleH2 = Selector('h2')
const Body = Selector('body')

test('Should render home page', async t => {
    await t.navigateTo(url())
    await t.expect(TitleH1.innerText).contains('Слова')
})

test('Should check wrong mp3 page', async t => {
    await t.navigateTo(url('/media/somewrong.mp3'))
    await t
        .expect(Body.innerText)
        .contains('Sorry, an error has occured, Requested page not found!')
})

test('Should check wrong image page', async t => {
    await t.navigateTo(url('/somewrong.png'))
    await t
        .expect(Body.innerText)
        .contains('Sorry, an error has occured, Requested page not found!')
})

test('Should check feature page', async t => {
    await t.navigateTo(url('/features'))
    await t.expect(TitleH2.innerText).contains('Coming soon')
})

test('Should check Sentry setup', async t => {
    await t.navigateTo(url())
    await t.expect(isSentry()).ok()
})
