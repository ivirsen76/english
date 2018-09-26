import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, SemanticInput } from '@ieremeev/formik'
import { validate } from 'server/services/card/hooks/validate.js'

export default class AddCardForm extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        initialValues: PropTypes.object,
        submitButtonTitle: PropTypes.string,
        hideLabel: PropTypes.bool,
        submitting: PropTypes.bool,
    }

    render() {
        return (
            <Formik
                validate={validate}
                onSubmit={this.props.onSubmit}
                initialValues={this.props.initialValues}
                render={({ isSubmitting }) => (
                    <Form className="ui form">
                        <Field name="text" component={SemanticInput} label="Text" autoFocus />
                        <Field name="translate" component={SemanticInput} label="Translation" />
                        {!this.props.hideLabel && (
                            <Field name="label" component={SemanticInput} label="Tag" />
                        )}

                        <button
                            className={`ui ${isSubmitting && 'loading'} compact button`}
                            type="submit"
                        >
                            {this.props.submitButtonTitle}
                        </button>
                    </Form>
                )}
            />
        )
    }
}
