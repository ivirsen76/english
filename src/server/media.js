const path = require('path')
const fs = require('fs-extra')

const mediaPath = process.env.IE_MEDIA_PATH || path.join(__dirname, '..', '..', 'media')

const getPath = filename => (filename ? `${mediaPath}/${filename}` : mediaPath)

const getBaseFilename = filename => filename.replace(`${getPath()}/`, '')

const addFile = async (filename, content) => {
    const fullFilename = getPath(filename)
    const folder = fullFilename.replace(/\/[^/]*$/, '')

    await fs.ensureDir(folder)
    if (await fs.exists(fullFilename)) {
        await fs.unlink(fullFilename)
    }
    await fs.writeFile(fullFilename, content)
}

const removeFile = async filename => {
    const fullFilename = getPath(filename)

    if (await fs.exists(fullFilename)) {
        await fs.unlink(fullFilename)
    }
}

const getFileContent = async filename => {
    const fullFilename = getPath(filename)

    if (await fs.exists(fullFilename)) {
        return fs.readFile(fullFilename)
    }

    return ''
}

module.exports = {
    addFile,
    getPath,
    getBaseFilename,
    removeFile,
    getFileContent,
}
