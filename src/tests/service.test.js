// Testing rest API
const app = require('../server/app')
const supertest = require('supertest')
const { getPath } = require('../server/media.js')
const {
    restoreDb,
    restoreSamples,
    getNumRecords,
    getRecord,
    runQuery,
} = require('../testcafe/db/utils.js')
const fs = require('fs-extra')
const path = require('path')

let server
let request

beforeAll(() => {
    server = app.listen(4999)
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
                    {
                        type: 'folder',
                        title: 'Folder',
                        id: 1000000000,
                        parentId: 0,
                        position: 0,
                        words:
                            'fresh, frozen, low-fat, raw, spice, takeaway, tinned, squid, chicken, spicy, grilled, beef, steamed, beans, breakfast, prawns, salmon, lamb, cabbage, margarine, carton, jar, warm, sausages, roast, chocolate, box, raw, fork, boiled, salt, cook, sugar, mushrooms, food, cucumber, beetroot, fruit, duck',
                    },
                ])
                .set('Authorization', token)
                .expect(201)

            expect(await getNumRecords('bases')).toBe(1)
        })
    })

    describe('put', () => {
        const bigImage = path.join(__dirname, 'assets', 'bigImage.jpg')
        const smallImage = path.join(__dirname, 'assets', 'smallImage.jpg')
        const wrongImage = path.join(__dirname, 'assets', 'wrongImage.jpg')

        it('should return 401 for not logged in', async () => {
            await request.put('/api/basetree/20').expect(401)
        })

        it('should return 403 for student role', async () => {
            const token = await loginAsStudent()
            await request
                .put('/api/basetree/20')
                .set('Authorization', token)
                .expect(403)
        })

        it('should return 200 for admin and big image', async () => {
            const token = await loginAsAdmin()
            const result = await request
                .put('/api/basetree/20')
                .attach('file', bigImage)
                .set('Authorization', token)
                .expect(200)
            const filename = result.body

            expect(await getNumRecords('bases', { id: 20, image: filename })).toBe(1)

            const { size } = fs.statSync(getPath(filename))
            expect(size).toBeGreaterThan(25000)
            expect(size).toBeLessThan(30000)

            // Change once again to check that file is still there
            const { body: newFilename } = await request
                .put('/api/basetree/20')
                .attach('file', bigImage)
                .set('Authorization', token)
                .expect(200)
            expect(fs.existsSync(getPath(newFilename))).toBe(true)
        })

        it('should return 400 for small image', async () => {
            const token = await loginAsAdmin()
            const result = await request
                .put('/api/basetree/20')
                .attach('file', smallImage)
                .set('Authorization', token)
                .expect(400)
            expect(result.body.message).toContain('Image has to be at least 320x400')
        })

        it('should return 400 for wrong image', async () => {
            const token = await loginAsAdmin()
            const result = await request
                .put('/api/basetree/20')
                .attach('file', wrongImage)
                .set('Authorization', token)
                .expect(400)
            expect(result.body.message).toContain('Input buffer contains unsupported image format')
        })

        it('should return 400 for wrong base id', async () => {
            const token = await loginAsAdmin()
            const result = await request
                .put('/api/basetree/2000')
                .attach('file', wrongImage)
                .set('Authorization', token)
                .expect(400)
            expect(result.body.message).toContain('No record found')
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
            const baseIds = [2, 13, 12, 1, 4]
            const expectedCounts = await Promise.all(
                baseIds.map(async id => (await getRecord('bases', { id })).count + 1)
            )

            const token = await loginAsAdmin()
            await request
                .post('/api/basecards')
                .send({ text: 'new test one', translate: 'новая', baseId: 2 })
                .set('Authorization', token)
                .expect(201)

            const resultedCounts = await Promise.all(
                baseIds.map(async id => (await getRecord('bases', { id })).count)
            )
            expect(resultedCounts).toEqual(expectedCounts)
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

        it('should return 200 for patching just writing information', async () => {
            const token = await loginAsStudent()
            await request
                .patch('/api/cards/25')
                .send({ writeRightAttempts: 10, status: 10 })
                .set('Authorization', token)
                .expect(200)

            // It should set userId to 2 anyway
            const num = await getNumRecords('cards', {
                writeRightAttempts: 10,
                status: 10,
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
            expect(afterNum).toBe(beforeNum + 7)
        })
    })
})
