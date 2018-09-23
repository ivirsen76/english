const app = require('../../app')
const request = require('request-promise-native')

let server
const port = 5000
const url = path => `http://localhost:${port}${path}`

beforeAll(() => {
    server = app.listen(port)
    return new Promise(resolve => server.on('listening', resolve))
})

afterAll(() => {
    app.get('sequelize').close()
    server.close()
})

// eslint-disable-next-line
describe.skip('basetree', () => {
    it('Should return nothing', async () => {
        const options = {
            method: 'post',
            uri: url('/basetree'),
            body: [
                { id: 1, parentId: 4, position: 0 },
                { id: 2, parentId: 1, position: 0 },
                { id: 3, parentId: 1, position: 1 },
                { id: 4, parentId: 0, position: 1 },
            ],
            json: true,
        }

        const response = await request(options)
        expect(response).toEqual([])
    })
})
