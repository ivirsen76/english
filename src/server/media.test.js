import { getPath, removeFile } from './media.js'
import fs from 'fs-extra'

describe('removeFile()', () => {
    it('Should create and remove file', async () => {
        const filename = 'test.txt'
        const fullFilename = getPath(filename)

        await removeFile(filename)
        fs.writeFileSync(fullFilename, 'Some data')

        expect(fs.existsSync(fullFilename)).toBe(true)

        await removeFile(filename)
        expect(fs.existsSync(fullFilename)).toBe(false)
    })
})
