// Testing rest API
const app = require('../app')
const supertest = require('supertest')
const { restoreDb, getNumRecords, getRecord } = require('../../testcafe/db/utils.js')

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
        it('should return 200 for not logged in', async () => {
            await request.get('/bases').expect(200)
        })
    })

    describe('get', () => {
        it('should return 405', async () => {
            await request.get('/bases/1').expect(405)
        })
    })

    describe('create', () => {
        it('should return 405', async () => {
            await request
                .post('/bases')
                .send({ title: 'some' })
                .expect(405)
        })
    })

    describe('update', () => {
        it('should return 405', async () => {
            await request.put('/bases/1').expect(405)
        })
    })

    describe('patch', () => {
        it('should return 405', async () => {
            await request.patch('/bases/1').expect(405)
        })
    })

    describe('delete', () => {
        it('should return 405', async () => {
            await request.delete('/bases/1').expect(405)
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
    })
})

describe('basecard', () => {
    describe('find', () => {
        it('should return 401 for not logged in', async () => {
            await request.get('/basecards').expect(401)
        })

        it('should return 403 for student role', async () => {
            const token = await loginAsStudent()
            await request
                .get('/basecards')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 200 for admin role', async () => {
            const token = await loginAsAdmin()
            await request
                .get('/basecards')
                .set('Authorization', token)
                .expect(200)
        })
    })

    describe('create', () => {
        it('should increment base cards count', async () => {
            const initialCount = (await getRecord('bases', { id: 2 })).count

            const token = await loginAsAdmin()
            await request
                .post('/basecards')
                .send({ text: 'new test one', translate: 'новая', baseId: 2 })
                .set('Authorization', token)
                .expect(201)

            const resultedCount = (await getRecord('bases', { id: 2 })).count
            expect(resultedCount).toBe(initialCount + 1)
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

        it('should return 405 when getting card', async () => {
            const token = await loginAsStudent()
            await request
                .get('/cards/25')
                .set('Authorization', token)
                .expect(405)
        })
    })

    describe('create', () => {
        it('should return 401 for not logged in', async () => {
            await request.post('/cards').expect(401)
        })

        it('should return 400 when there are errors during creating the card', async () => {
            const token = await loginAsStudent()
            await request
                .post('/cards')
                .send({ text: 'русский', translate: 'english', label: '' })
                .set('Authorization', token)
                .expect(400)
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

    describe('update', () => {
        it('should return 401 for not logged in', async () => {
            await request.put('/cards/25').expect(401)
        })

        it('should return 405 for logged in user', async () => {
            const token = await loginAsStudent()
            await request
                .put('/cards/25')
                .set('Authorization', token)
                .expect(405)
        })
    })

    describe('patch', () => {
        it('should return 401 for not logged in', async () => {
            await request.patch('/cards/26').expect(401)
        })

        it('should return 403 for patching different user card', async () => {
            const token = await loginAsStudent()
            await request
                .patch('/cards/25')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 200 for patching your card', async () => {
            const token = await loginAsStudent()
            await request
                .patch('/cards/26')
                .send({
                    text: 'bla-bla',
                    translate: 'сон',
                    label: 'tutorial',
                    ukSoundFile: 'wrong',
                    userId: 1,
                })
                .set('Authorization', token)
                .expect(200)

            // It should set userId to 2 anyway
            const num = await getNumRecords('cards', {
                text: 'bla-bla',
                translate: 'сон',
                label: 'tutorial',
                ukSoundFile: 'sample.mp3',
                userId: 2,
            })
            expect(num).toBe(1)
        })
    })

    describe('delete', () => {
        it('should return 401 for not logged in', async () => {
            await request.delete('/cards/26').expect(401)
        })

        it('should return 403 for deleting different user card', async () => {
            const token = await loginAsStudent()
            await request
                .delete('/cards/25')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 200 for patching your card', async () => {
            const token = await loginAsStudent()
            await request
                .delete('/cards/26')
                .set('Authorization', token)
                .expect(200)

            const num = await getNumRecords('cards', {
                text: 'calendar',
                userId: 2,
            })
            expect(num).toBe(0)
        })
    })
})

describe('basetocards', () => {
    describe('update', () => {
        it('Should add cards from base', async () => {
            const userId = 2
            const baseId = 2

            const beforeNum = await getNumRecords('cards', { userId })
            const token = await loginAsStudent()
            await request
                .put(`/basetocard/${baseId}`)
                .set('Authorization', token)
                .expect(200)

            const afterNum = await getNumRecords('cards', { userId })
            expect(afterNum).toBe(beforeNum + 9)
        })
    })
})
