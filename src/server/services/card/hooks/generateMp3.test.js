import _keys from 'lodash/keys'
import fs from 'fs-extra'

const generateMp3 = require('./generateMp3.js')

describe('generate mp3', () => {
    it('Should generate file', async () => {
        const result = await generateMp3('sounds/temp', 'How are you?', 'uk')
        expect(_keys(result)).toEqual(['language', 'filename', 'duration'])
        expect(result.language).toBe('uk')

        // Duration can vary
        expect(result.duration).toBeGreaterThan(800)
        expect(result.duration).toBeLessThan(900)

        expect(fs.existsSync(result.filename)).toBe(true)
        const { size } = fs.statSync(result.filename)

        // clean files
        fs.unlinkSync(result.filename)

        // Body size can vary
        expect(size).toBeGreaterThan(4000)
        expect(size).toBeLessThan(6000)
    })
})
