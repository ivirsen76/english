// Testing production HTTP requests
const supertest = require('supertest')

const request = supertest('http://www.word-word.club')

const checkOrigin = response => {
    const headers = Object.keys(response.header).map(item => item.toLowerCase())
    expect(headers.includes('access-control-allow-origin')).toBe(false)
}

describe('Pages', () => {
    it('should check home page', async () => {
        await request
            .get('/')
            .expect('Cache-Control', /private, no-store/)
            .expect('Content-Type', /text\/html; charset=UTF-8/)
            .expect('X-Served-By', /^cache-/)
            .expect(checkOrigin)
            .expect(200)
    })

    it('should check some image', async () => {
        await request
            .get('/logo-daeb72570163e0d5d9c8514d0798138c.png')
            .expect('Cache-Control', /max-age=604800/)
            .expect('Content-Type', /image\/png/)
            .expect('X-Served-By', /^cache-/)
            .expect(checkOrigin)
            .expect(200)
    })

    it('should check some sound', async () => {
        await request
            .get('/media/sample.mp3')
            .expect('Cache-Control', /max-age=604800/)
            .expect('Content-Type', /audio\/mpeg/)
            .expect('X-Served-By', /^cache-/)
            .expect(checkOrigin)
            .expect(200)
    })

    it('should check return 404 for non existing sound', async () => {
        await request
            .get('/media/nonexistingsample.mp3')
            .expect('Cache-Control', /private, no-store/)
            .expect(checkOrigin)
            .expect(404)
    })

    it('should check return 404 for non existing image', async () => {
        await request
            .get('/nonexistingimage.png')
            .expect('Cache-Control', /private, no-store/)
            .expect(checkOrigin)
            .expect(404)
    })

    it('should check right API call', async () => {
        await request
            .get('/api/bases')
            .expect('Cache-Control', /private, no-store/)
            .expect('Content-Type', /application\/json/)
            .expect('X-Served-By', /^cache-/)
            .expect(checkOrigin)
            .expect(200)
    })

    it('should check wrong API call', async () => {
        await request
            .get('/somewrongurl')
            .expect('Cache-Control', /private, no-store/)
            .expect('Content-Type', /text\/html/)
            .expect('X-Served-By', /^cache-/)
            .expect(checkOrigin)
            .expect(200)
    })
})

describe('Media', () => {
    it('Should return 405', async () => {
        await request
            .get('/api/mp3/1')
            .expect('Cache-Control', /private, no-store/)
            .expect(checkOrigin)
            .expect(405)
    })

    // 3478 is a special ID
    it('Should return 200', async () => {
        await request
            .get('/api/mp3/3478')
            .expect('Cache-Control', /private, no-store/)
            .expect(checkOrigin)
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
