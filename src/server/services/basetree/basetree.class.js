const { getUpdates } = require('./utils.js')
const _omit = require('lodash/omit')
const { addFile, removeFile } = require('../../media.js')
const { BadRequest } = require('feathers-errors')
const sharp = require('sharp')
const md5 = require('md5')

class Service {
    setup(app) {
        this.app = app
    }

    constructor(options) {
        this.options = options || {}
    }

    async create(data, params) {
        const bases = this.app.getService('bases')

        const result = await bases.find()
        const updates = getUpdates(result.data, data)
        const newIds = {}

        for (let i = 0; i < updates.length; i++) {
            const update = updates[i]

            if (newIds[update.parentId]) {
                update.parentId = newIds[update.parentId]
            }

            if (update.query === 'delete') {
                await bases.remove(update.id)
            }
            if (update.query === 'update') {
                await bases.patch(update.id, _omit(update, ['id', 'query']))
            }
            if (update.query === 'insert') {
                const inserted = await bases.create(_omit(update, ['id', 'query']))
                newIds[update.id] = inserted.dataValues.id
            }
        }

        return newIds
    }

    async update(id, data, params) {
        const acceptedFormats = ['jpeg', 'png']
        const desiredWidth = 320
        const desiredHeight = 400

        try {
            const bases = this.app.getService('bases')
            const baseInfo = await bases.get(id)
            const currentImage = baseInfo.dataValues.image

            const image = sharp(params.files.file.data)
            const { format, width, height } = await image.metadata()

            if (!acceptedFormats.includes(format)) {
                throw new Error('Wrong format')
            }

            if (width < desiredWidth || height < desiredHeight) {
                throw new Error(`Image has to be at least ${desiredWidth}x${desiredHeight}`)
            }

            const buffer = await image
                .resize(desiredWidth, desiredHeight)
                .toFormat('jpeg')
                .toBuffer()
            const hash = md5(buffer).substring(0, 10)
            const newImage = `images/base_${id}_${hash}.jpg`
            await addFile(newImage, buffer)

            await bases.patch(id, { image: newImage })

            // Remove old image
            if (currentImage && currentImage !== newImage) {
                await removeFile(currentImage)
            }

            return newImage
        } catch (errors) {
            throw new BadRequest(errors.message)
        }
    }
}

module.exports = function(options) {
    return new Service(options)
}

module.exports.Service = Service
