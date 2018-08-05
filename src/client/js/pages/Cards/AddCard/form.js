import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from 'js/components/SemanticInput'
import { validate } from 'server/services/card/hooks/validate.js'

class AddCardForm extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        submitButtonTitle: PropTypes.string,
        hideLabel: PropTypes.bool,
        submitting: PropTypes.bool,
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="ui form">
                <Field name="text" component={Input} label="Text" autoFocus />
                <Field name="translate" component={Input} label="Translation" />
                {!this.props.hideLabel && <Field name="label" component={Input} label="Tag" />}

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

export default reduxForm({ validate })(AddCardForm)
