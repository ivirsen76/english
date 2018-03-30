import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from 'js/components/SemanticInput'
import { stripBrackets } from 'js/utils/card.js'

export const errorMessages = {
    noText: 'Text is required',
    invalidText: 'Text has to be in English',
    noTranslate: 'Translation is required',
    invalidTranslate: 'Translation has to be in Russian',
}

export const validate = values => {
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

class AddCardForm extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        submitButtonTitle: PropTypes.string,
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="ui form">
                <Field name="text" component={Input} label="Text" autoFocus />
                <Field name="translate" component={Input} label="Translation" />
                <Field name="label" component={Input} label="Tag" />

                <button className="ui compact button" type="submit">
                    {this.props.submitButtonTitle}
                </button>
            </form>
        )
    }
}

export default reduxForm({
    validate,
})(AddCardForm)
