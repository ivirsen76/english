import _keys from 'lodash/keys'
import request from 'request-promise-native'
import { AWS } from '../../../utils.js'

require('dotenv').config()

const s3 = new AWS.S3()
const generateMp3 = require('./generateMp3.js')

// eslint-disable-next-line
describe('generate mp3', () => {
    it('Should generate file', async () => {
        const result = await generateMp3('users/100', 'How are you?', 'uk')
        expect(_keys(result)).toEqual(['language', 'filename', 'duration'])
        expect(result.language).toBe('uk')

        // Duration can vary
        expect(result.duration).toBeGreaterThan(800)
        expect(result.duration).toBeLessThan(900)

        const response = await request({
            uri: `http:${process.env.IE_AWS_S3_PUBLIC_URL}sounds/${result.filename}`,
            resolveWithFullResponse: true,
        })

        // clean files
        await s3
            .deleteObject({
                Bucket: process.env.IE_AWS_S3_BUCKET,
                Key: `public/sounds/${result.filename}`,
            })
            .promise()

        expect(response.statusCode).toBe(200)

        // Body size can vary
        expect(response.body.length).toBeGreaterThan(4000)
        expect(response.body.length).toBeLessThan(5000)
    })
})
