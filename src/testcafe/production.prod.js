import { Selector, ClientFunction } from '@ieremeev/app/testcafe'
import supertest from '@ieremeev/app/supertest'

fixture('Production tests')

const isSentry = ClientFunction(() => window.__SENTRY__)
const isShuffleCards = ClientFunction(() => window.ieremeev.check.shuffleCards)
const url = (path = '') => `https://www.word-word.club${path}`
const cdnUrl = 'https://wordword-ed15.kxcdn.com'
const request = supertest(cdnUrl)

const checkAsset = async (t, assetUrl, type) => {
    await t.expect(assetUrl).contains(cdnUrl)

    const parsedUrl = new URL(assetUrl)
    await request
        .get(parsedUrl.pathname)
        .expect('Cache-Control', /max-age=604800/)
        .expect('Content-Type', type)
        .expect('access-control-allow-origin', '*')
        .expect(200)
}

const checkGzip = async assetUrl => {
    const parsedUrl = new URL(assetUrl)
    await request
        .get(parsedUrl.pathname)
        .expect('content-encoding', 'gzip')
        .expect(200)
}

// Selectors
const TitleH1 = Selector('h1')
const TitleH2 = Selector('h2')
const Body = Selector('body')

test('Should render home page', async t => {
    await t.navigateTo(url())
    await t.expect(TitleH1.innerText).contains('Слова')
})

// Check assets
;(() => {
    test('Should get image on home page from CDN', async t => {
        await t.navigateTo(url())

        const imageUrl = await Selector('img[alt=books]').getAttribute('src')
        await checkAsset(t, imageUrl, /image\/png/)
    })

    test('Should get base images from CDN', async t => {
        await t.navigateTo(url('/bases'))

        const imageUrl = await Selector('img[alt=Elementary]').getAttribute('src')
        await checkAsset(t, imageUrl, /image\/jpeg/)
    })

    test('Should get some sound from CDN', async t => {
        await t.navigateTo(url())

        const soundUrl = await Selector('a')
            .withText('Sound example')
            .getAttribute('href')
        await checkAsset(t, soundUrl, /audio\/mpeg/)
    })

    test('Should check that CSS is coming with GZIP', async t => {
        await t.navigateTo(url())

        const cssUrl = await Selector('head')
            .find('link[rel=stylesheet]')
            .getAttribute('href')
        await checkAsset(t, cssUrl, /text\/css/)
        await checkGzip(cssUrl)
    })

    test('Should check that JS is coming with GZIP', async t => {
        await t.navigateTo(url())

        const jsUrl = await Selector('script[type="text/javascript"]').getAttribute('src')
        await checkAsset(t, jsUrl, /application\/javascript/)
        await checkGzip(jsUrl)
    })
})()

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

test('Should check that cards are shuffled', async t => {
    await t.navigateTo(url())
    await t.expect(isShuffleCards()).ok()
})
