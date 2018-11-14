// Testing production HTTP requests
const supertest = require('supertest')

const baseUrl = 'http://www.word-word.club'
const request = supertest(baseUrl)

describe('Pages', () => {
    it('should check home page', async () => {
        await request
            .get('/')
            .expect('Access-Control-Allow-Origin', baseUrl)
            .expect('Cache-Control', /private, no-store/)
            .expect('Content-Type', /text\/html; charset=UTF-8/)
            .expect('X-Served-By', /^cache-/)
            .expect(200)
    })

    it('should check some image', async () => {
        await request
            .get('/logo-3254c39614bc43d5f03eebf607256350.png')
            .expect('Access-Control-Allow-Origin', baseUrl)
            .expect('Cache-Control', /max-age=604800/)
            .expect('Content-Type', /image\/png/)
            .expect('X-Served-By', /^cache-/)
            .expect(200)
    })

    it('should check some sound', async () => {
        await request
            .get('/media/sample.mp3')
            .expect('Access-Control-Allow-Origin', baseUrl)
            .expect('Cache-Control', /max-age=604800/)
            .expect('Content-Type', /audio\/mpeg/)
            .expect('X-Served-By', /^cache-/)
            .expect(200)
    })

    it('should check return 404 for non existing sound', async () => {
        await request
            .get('/media/nonexistingsample.mp3')
            .expect('Access-Control-Allow-Origin', baseUrl)
            .expect('Cache-Control', /private, no-store/)
            .expect(404)
    })

    it('should check return 404 for non existing image', async () => {
        await request
            .get('/nonexistingimage.png')
            .expect('Access-Control-Allow-Origin', baseUrl)
            .expect('Cache-Control', /private, no-store/)
            .expect(404)
    })

    it('should check right API call', async () => {
        await request
            .get('/api/bases')
            .expect('Access-Control-Allow-Origin', baseUrl)
            .expect('Cache-Control', /private, no-store/)
            .expect('Content-Type', /application\/json/)
            .expect('X-Served-By', /^cache-/)
            .expect(200)
    })

    it('should check wrong API call', async () => {
        await request
            .get('/somewrongurl')
            .expect('Access-Control-Allow-Origin', baseUrl)
            .expect('Cache-Control', /private, no-store/)
            .expect('Content-Type', /text\/html/)
            .expect('X-Served-By', /^cache-/)
            .expect(200)
    })
})

describe('Media', () => {
    it('Should return 405', async () => {
        await request
            .get('/api/mp3/1')
            .expect('Access-Control-Allow-Origin', baseUrl)
            .expect('Cache-Control', /private, no-store/)
            .expect(405)
    })

    // 3478 is a special ID
    it('Should return 200', async () => {
        await request
            .get('/api/mp3/3478')
            .expect('Access-Control-Allow-Origin', baseUrl)
            .expect('Cache-Control', /private, no-store/)
            .expect(200)
    })
})

describe('Responses', () => {
    it('should check redirection', async () => {
        await supertest('http://word-word.club')
            .get('/')
            .expect('Location', /http:\/\/www.word-word.club/)
            .expect(302)
    })

    it('should not found a wrong subdomain', () => {
        supertest('http://wwww.word-word.club')
            .get('/')
            .end((err, res) => {
                expect(err.errno).toBe('ENOTFOUND')
            })
    })
})
