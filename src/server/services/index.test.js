// Testing rest API
const app = require('../app')
const supertest = require('supertest')
const { restoreDb, getNumRecords } = require('../../testcafe/db/utils.js')

let server
let request

beforeAll(() => {
    server = app.listen(5000)
    request = supertest(server)
    return new Promise(resolve => server.on('listening', resolve))
})

afterAll(() => {
    restoreDb()
    app.get('sequelize').close()
    server.close()
})

beforeEach(() => {
    restoreDb()
})

const loginAsStudent = async () => {
    const result = await request.post('/auth/local').send({
        email: 'student@gmail.com',
        password: 'password',
    })

    return result.body.token
}

const loginAsAdmin = async () => {
    const result = await request.post('/auth/local').send({
        email: 'admin@gmail.com',
        password: 'password',
    })

    return result.body.token
}

describe('base', () => {
    describe('find', () => {
        it('should return 401 for not logged in', async () => {
            await request.get('/bases').expect(401)
        })

        it('should return 403 for student role', async () => {
            const token = await loginAsStudent()
            await request
                .get('/bases')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 200 for admin role', async () => {
            const token = await loginAsAdmin()
            await request
                .get('/bases')
                .set('Authorization', token)
                .expect(200)
        })
    })
})

describe('basetree', () => {
    describe('create', () => {
        it('should return 401 for not logged in', async () => {
            await request.post('/basetree').expect(401)
        })

        it('should return 403 for student role', async () => {
            const token = await loginAsStudent()
            await request
                .post('/basetree')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 201 for admin role', async () => {
            const token = await loginAsAdmin()
            await request
                .post('/basetree')
                .send([])
                .set('Authorization', token)
                .expect(201)
        })
    })
})

describe('cards', () => {
    describe('find', () => {
        it('should return 401 for not logged in', async () => {
            await request.get('/cards').expect(401)
        })

        it('should return 200 for student role', async () => {
            const token = await loginAsStudent()
            await request
                .get('/cards')
                .set('Authorization', token)
                .expect(200)
        })
    })

    describe('get', () => {
        it('should return 401 for not logged in', async () => {
            await request.get('/cards/25').expect(401)
        })

        it('should return 200 when getting your own card', async () => {
            const token = await loginAsStudent()
            await request
                .get('/cards/26')
                .set('Authorization', token)
                .expect(200)
        })

        it('should return 403 when getting different user card', async () => {
            const token = await loginAsStudent()
            await request
                .get('/cards/25')
                .set('Authorization', token)
                .expect(403)
        })
    })

    describe('create', () => {
        it('should return 401 for not logged in', async () => {
            await request.post('/cards').expect(401)
        })

        it('should return 200 when creating the card', async () => {
            const token = await loginAsStudent()
            await request
                .post('/cards')
                .send({ text: 'new test one', translate: 'новая', label: '', userId: 1 })
                .set('Authorization', token)
                .expect(201)

            // It should set userId to 2 anyway
            const num = await getNumRecords('cards', { text: 'new test one', userId: 2 })
            expect(num).toBe(1)
        })
    })
})
