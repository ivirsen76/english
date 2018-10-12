import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, SemanticInput, SemanticSelect } from '@ieremeev/formik'

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

export default class Component extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        updateBase: PropTypes.func,
    }

    updateBase = values => {
        this.props.updateBase({ ...values, id: this.props.base.id })
    }

    render() {
        return (
            <div>
                <h2>{this.props.base.title}</h2>
                <Formik
                    initialValues={{
                        title: this.props.base.title,
                        arrangeChildren: this.props.base.arrangeChildren,
                    }}
                    isInitialValid
                    validate={validate}
                    onValidChange={this.updateBase}
                    render={props => (
                        <Form className="ui form">
                            <Field name="title" component={SemanticInput} label="Title" autoFocus />
                            <div className="fields">
                                <Field
                                    name="arrangeChildren"
                                    component={SemanticSelect}
                                    label="Arrange children method"
                                    options={[
                                        { value: 'table', label: 'Table' },
                                        { value: 'list', label: 'List' },
                                    ]}
                                    type="button"
                                />
                            </div>
                        </Form>
                    )}
                />
            </div>
        )
    }
}
