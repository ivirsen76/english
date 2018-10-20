import { getPath, removeFile, getFileContent } from './media.js'
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

describe('getFileContent()', () => {
    it('Should return file content', async () => {
        const filename = 'test.txt'
        const fullFilename = getPath(filename)

        await removeFile(filename)
        fs.writeFileSync(fullFilename, 'Some data')

        const content = await getFileContent(filename)
        expect(content.toString()).toBe('Some data')
        await removeFile(filename)
    })
})
