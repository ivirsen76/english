const { BadRequest } = require('feathers-errors')
const _isEmpty = require('lodash/isEmpty')

const stripBrackets = text => text.replace(/\([^)]*\)/g, '').trim()

const errorMessages = {
    noText: 'Text is required',
    invalidText: 'Text has to be in English',
    noTranslate: 'Translation is required',
    invalidTranslate: 'Translation has to be in Russian',
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
        } else if (!/^[\s\dа-яА-Я.,\-!?;:'"]+$/.test(translate)) {
            errors.translate = errorMessages.invalidTranslate
        }
    }

    return errors
}

module.exports = options => async hook => {
    const errors = validate(hook.data)

    if (!_isEmpty(errors)) {
        throw new BadRequest('Invalid request', { errors })
    }
}
module.exports.validate = validate
module.exports.errorMessages = errorMessages
module.exports.stripBrackets = stripBrackets
