const path = require('path')
const fs = require('fs-extra')

const mediaPath = process.env.IE_MEDIA_PATH || path.join(__dirname, '..', '..', 'media')

const getPath = filename => (filename ? `${mediaPath}/${filename}` : mediaPath)

const removeFile = async filename => {
    const fullFilename = getPath(filename)

    if (await fs.exists(fullFilename)) {
        await fs.unlink(fullFilename)
    }
}

module.exports = {
    getPath,
    removeFile,
}
