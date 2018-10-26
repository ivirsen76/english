// Testing rest API
const app = require('../app')
const supertest = require('supertest')
const {
    restoreDb,
    restoreSamples,
    getNumRecords,
    getRecord,
    runQuery,
} = require('../../testcafe/db/utils.js')

let server
let request

beforeAll(() => {
    server = app.listen(5000)
    request = supertest(server)
    return new Promise(resolve => server.on('listening', resolve))
})

afterAll(() => {
    restoreDb()
    restoreSamples()
    app.get('sequelize').close()
    server.close()
})

beforeEach(() => {
    restoreDb()
    restoreSamples()
})

const loginAsStudent = async () => {
    const result = await request.post('/api/auth/local').send({
        email: 'student@gmail.com',
        password: 'password',
    })

    return result.body.token
}

const loginAsAdmin = async () => {
    const result = await request.post('/api/auth/local').send({
        email: 'admin@gmail.com',
        password: 'password',
    })

    return result.body.token
}

describe('base', () => {
    describe('find', () => {
        it('should return 200 for not logged in', async () => {
            await request.get('/api/bases').expect(200)
        })
    })

    describe('get', () => {
        it('should return 405', async () => {
            await request.get('/api/bases/1').expect(405)
        })
    })

    describe('create', () => {
        it('should return 405', async () => {
            await request
                .post('/api/bases')
                .send({ title: 'some' })
                .expect(405)
        })
    })

    describe('update', () => {
        it('should return 405', async () => {
            await request.put('/api/bases/1').expect(405)
        })
    })

    describe('patch', () => {
        it('should return 405', async () => {
            await request.patch('/api/bases/1').expect(405)
        })
    })

    describe('delete', () => {
        it('should return 405', async () => {
            await request.delete('/api/bases/1').expect(405)
        })
    })
})

describe('basetree', () => {
    describe('create', () => {
        it('should return 401 for not logged in', async () => {
            await request.post('/api/basetree').expect(401)
        })

        it('should return 403 for student role', async () => {
            const token = await loginAsStudent()
            await request
                .post('/api/basetree')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 201 for admin role', async () => {
            await runQuery('TRUNCATE TABLE basecards')
            await runQuery('TRUNCATE TABLE bases')

            const token = await loginAsAdmin()
            await request
                .post('/api/basetree')
                .send([
                    { type: 'folder', title: 'Folder', id: 1000000000, parentId: 0, position: 0 },
                ])
                .set('Authorization', token)
                .expect(201)

            expect(await getNumRecords('bases')).toBe(1)
        })
    })
})

describe('basecard', () => {
    describe('find', () => {
        it('should return 200 for not logged in student', async () => {
            await request.get('/api/basecards').expect(200)
        })
    })

    describe('get', () => {
        it('should return 405', async () => {
            await request.get('/api/basecards/1').expect(405)
        })
    })

    describe('update', () => {
        it('should return 405', async () => {
            await request.put('/api/basecards/1').expect(405)
        })
    })

    describe('create', () => {
        it('should return 401 for not logged in', async () => {
            await request
                .post('/api/basecards')
                .send({ text: 'new test one', translate: 'новая' })
                .expect(401)
        })

        it('should return 403 for student role', async () => {
            const token = await loginAsStudent()
            await request
                .post('/api/basecards')
                .send({ text: 'new test one', translate: 'новая' })
                .set('Authorization', token)
                .expect(403)
        })

        it('should increment base cards count', async () => {
            const initialCount = (await getRecord('bases', { id: 2 })).count

            const token = await loginAsAdmin()
            await request
                .post('/api/basecards')
                .send({ text: 'new test one', translate: 'новая', baseId: 2 })
                .set('Authorization', token)
                .expect(201)

            const resultedCount = (await getRecord('bases', { id: 2 })).count
            expect(resultedCount).toBe(initialCount + 1)
        })
    })

    describe('patch', () => {
        it('should return 401 for not logged in', async () => {
            await request.patch('/api/basecards/26').expect(401)
        })

        it('should return 403 for student role', async () => {
            const token = await loginAsStudent()
            await request
                .patch('/api/basecards/1')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 200 for admin', async () => {
            const token = await loginAsAdmin()
            await request
                .patch('/api/basecards/1')
                .send({
                    text: 'bla-bla',
                    translate: 'сон',
                    label: 'tutorial',
                    ukSoundFile: 'wrong',
                })
                .set('Authorization', token)
                .expect(200)
        })
    })

    describe('delete', () => {
        it('should return 401 for not logged in', async () => {
            await request.delete('/api/basecards/1').expect(401)
        })

        it('should return 403 for student', async () => {
            const token = await loginAsStudent()
            await request
                .delete('/api/basecards/1')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 200 for admin', async () => {
            const token = await loginAsAdmin()
            await request
                .delete('/api/basecards/1')
                .set('Authorization', token)
                .expect(200)
        })
    })
})

describe('cards', () => {
    describe('find', () => {
        it('should return 401 for not logged in', async () => {
            await request.get('/api/cards').expect(401)
        })

        it('should return 200 for student role', async () => {
            const token = await loginAsStudent()
            await request
                .get('/api/cards')
                .set('Authorization', token)
                .expect(200)
        })
    })

    describe('get', () => {
        it('should return 401 for not logged in', async () => {
            await request.get('/api/cards/26').expect(401)
        })

        it('should return 405 when getting card', async () => {
            const token = await loginAsStudent()
            await request
                .get('/api/cards/26')
                .set('Authorization', token)
                .expect(405)
        })
    })

    describe('create', () => {
        it('should return 401 for not logged in', async () => {
            await request.post('/api/cards').expect(401)
        })

        it('should return 400 when there are errors during creating the card', async () => {
            const token = await loginAsStudent()
            await request
                .post('/api/cards')
                .send({ text: 'русский', translate: 'english', label: '' })
                .set('Authorization', token)
                .expect(400)
        })

        it('should return 200 when creating the card', async () => {
            const token = await loginAsStudent()
            await request
                .post('/api/cards')
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
            await request.put('/api/cards/26').expect(401)
        })

        it('should return 405 for logged in user', async () => {
            const token = await loginAsStudent()
            await request
                .put('/api/cards/26')
                .set('Authorization', token)
                .expect(405)
        })
    })

    describe('patch', () => {
        it('should return 401 for not logged in', async () => {
            await request.patch('/api/cards/25').expect(401)
        })

        it('should return 403 for patching different user card', async () => {
            const token = await loginAsStudent()
            await request
                .patch('/api/cards/26')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 200 for patching your card', async () => {
            const token = await loginAsStudent()
            await request
                .patch('/api/cards/25')
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
                ukSoundFile: 'samples/sample.mp3',
                userId: 2,
            })
            expect(num).toBe(1)
        })
    })

    describe('delete', () => {
        it('should return 401 for not logged in', async () => {
            await request.delete('/api/cards/25').expect(401)
        })

        it('should return 403 for deleting different user card', async () => {
            const token = await loginAsStudent()
            await request
                .delete('/api/cards/26')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 200 for deleting your card', async () => {
            const token = await loginAsStudent()
            await request
                .delete('/api/cards/25')
                .set('Authorization', token)
                .expect(200)

            const num = await getNumRecords('cards', { text: 'calendar', userId: 2 })
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
                .put(`/api/basetocard/${baseId}`)
                .set('Authorization', token)
                .expect(200)

            const afterNum = await getNumRecords('cards', { userId })
            expect(afterNum).toBe(beforeNum + 8)
        })
    })
})
