/* global describe, it, expect */
import _keys from 'lodash/keys'
import request from 'request-promise-native'

require('dotenv').config()
const generateMp3 = require('./generateMp3.js')


describe('generate mp3', () => {
    it('Should generate file', async () => {
        const result = await generateMp3(10, 100, 'How are you?', 'uk')
        expect(_keys(result)).toEqual(['language', 'filename', 'duration'])
        expect(result.language).toBe('uk')

        // Duration can vary
        expect(result.duration).toBeGreaterThan(900)
        expect(result.duration).toBeLessThan(1100)

        const response = await request({
            uri: `${process.env.AWS_S3_PUBLIC_URL}sounds/${result.filename}`,
            resolveWithFullResponse: true,
        })
        expect(response.statusCode).toBe(200)

        // Body size can vary
        expect(response.body.length).toBeGreaterThan(6000)
        expect(response.body.length).toBeLessThan(7000)
    })
})
