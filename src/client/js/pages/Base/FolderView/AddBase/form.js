import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from 'js/components/SemanticInput'
import Select from 'js/components/SemanticSelect'

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
                <Field
                    name="type"
                    component={Select}
                    label="Type"
                    options={[
                        { label: 'Folder', value: 'folder' },
                        { label: 'Cards', value: 'cards' },
                    ]}
                    style={{ maxWidth: '100px' }}
                />

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
