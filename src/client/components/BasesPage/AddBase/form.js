import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from 'components/SemanticInput'

export const errorMessages = {
    noTitle: 'You have to provide title',
}

export const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = errorMessages.noTitle
    }

    return errors
}

class AddBaseForm extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        submitButtonTitle: PropTypes.string,
        submitting: PropTypes.bool,
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="ui form">
                <Field name="title" component={Input} label="Title" autoFocus />

                <button
                    className={`ui ${this.props.submitting && 'loading'} compact button`}
                    type="submit"
                >
                    {this.props.submitButtonTitle}
                </button>
            </form>
        )
    }
}

export default reduxForm({ validate })(AddBaseForm)
