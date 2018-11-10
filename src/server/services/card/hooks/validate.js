const { BadRequest } = require('feathers-errors')
const _isEmpty = require('lodash/isEmpty')
const { stripBrackets } = require('../../../utils.js')

const errorMessages = {
    noText: 'Text is required',
    invalidText: 'Text has to be in English',
    noTranslate: 'Translation is required',
    invalidTranslate: 'Translation has to be in Russian',
    duplicatedText: 'Text already exists',
}

// this function is also used for front-end
const validate = values => {
    const errors = {}

    if (!values.text) {
        errors.text = errorMessages.noText
    } else {
        const text = stripBrackets(values.text)

        if (text === '') {
            errors.text = errorMessages.noText
        } else if (!/^[\s\da-zA-Z.,\-!?;:'"]+$/.test(text)) {
            errors.text = errorMessages.invalidText
        }
    }

    if (!values.translate) {
        errors.translate = errorMessages.noTranslate
    } else {
        const translate = stripBrackets(values.translate)

        if (translate === '') {
            errors.translate = errorMessages.noTranslate
        } else if (!/^[\s\dа-яА-ЯёЁ.,\-!?;:'"]+$/.test(translate)) {
            errors.translate = errorMessages.invalidTranslate
        }
    }

    return errors
}

const validateCreate = options => async hook => {
    const errors = validate(hook.data)

    if (_isEmpty(errors)) {
        const { total } = await hook.service.find({
            query: {
                userId: hook.data.userId,
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
                userId: data.userId,
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
module.exports.validate = validate
module.exports.errorMessages = errorMessages
