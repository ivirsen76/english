// Testing production HTTP requests
const supertest = require('supertest')

const request = supertest('http://www.word-word.club')

describe('Pages', () => {
    it('should check home page', async () => {
        await request
            .get('/')
            .expect('Cache-Control', /private, no-store/)
            .expect('Content-Type', /text\/html; charset=UTF-8/)
            .expect('X-Served-By', /^cache-/)
            .expect(200)
    })

    it('should check some image', async () => {
        await request
            .get('/logo-3254c39614bc43d5f03eebf607256350.png')
            .expect('Cache-Control', /max-age=86400/)
            .expect('Content-Type', /image\/png/)
            .expect('X-Served-By', /^cache-/)
            .expect(200)
    })

    it('should check some sound', async () => {
        await request
            .get('/media/sample.mp3')
            .expect('Cache-Control', /max-age=86400/)
            .expect('Content-Type', /image\/png/)
            .expect('X-Served-By', /^cache-/)
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
