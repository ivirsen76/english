const { BadRequest } = require('feathers-errors')
const _isEmpty = require('lodash/isEmpty')
const { validate, errorMessages } = require('../../card/hooks/validate.js')

const validateCreate = options => async hook => {
    const errors = validate(hook.data)

    if (_isEmpty(errors)) {
        const { total } = await hook.service.find({
            query: {
                baseId: hook.data.baseId,
                text: hook.data.text.trim(),
                $select: ['id'],
            },
        })
        if (total > 0) {
            errors.text = errorMessages.duplicatedText
        }
    }

    if (!_isEmpty(errors)) {
        throw new BadRequest('Invalid request', { errors })
    }
}

const validatePatch = options => async hook => {
    const { dataValues: currentData } = await hook.service.get(hook.id)
    const data = {
        ...currentData,
        ...hook.data,
    }

    const errors = validate(data)

    if (_isEmpty(errors)) {
        const { total } = await hook.service.find({
            query: {
                baseId: data.baseId,
                text: data.text.trim(),
                id: { $ne: hook.id },
            },
        })
        if (total > 0) {
            errors.text = errorMessages.duplicatedText
        }
    }

    if (!_isEmpty(errors)) {
        throw new BadRequest('Invalid request', { errors })
    }
}

module.exports.validateCreate = validateCreate
module.exports.validatePatch = validatePatch
