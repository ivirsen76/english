import _keys from 'lodash/keys'
import fs from 'fs-extra'
import { getPath } from '../../../media.js'

const generateMp3 = require('./generateMp3.js')

describe('generate mp3', () => {
    it('Should generate file', async () => {
        const result = await generateMp3('sounds/temp', 'How are you?', 'uk')
        expect(_keys(result)).toEqual(['language', 'filename', 'duration'])
        expect(result.language).toBe('uk')
        expect(result.filename).toMatch(/^sounds\/temp\//)

        // Duration can vary
        expect(result.duration).toBeGreaterThan(800)
        expect(result.duration).toBeLessThan(900)

        const fullFilename = getPath(result.filename)
        expect(fs.existsSync(fullFilename)).toBe(true)
        const { size } = fs.statSync(fullFilename)

        // clean files
        fs.unlinkSync(fullFilename)

        // Body size can vary
        expect(size).toBeGreaterThan(4000)
        expect(size).toBeLessThan(6000)
    })
})
