const app = require('../../app')
let supertest = require('supertest')

let server
let request

beforeAll(() => {
    server = app.listen(5000)
    request = supertest(server)
    return new Promise(resolve => server.on('listening', resolve))
})

afterAll(() => {
    app.get('sequelize').close()
    server.close()
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
