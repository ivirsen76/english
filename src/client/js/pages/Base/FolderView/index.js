import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field } from 'formik'
import FormikInput from 'client/js/components/FormikInput'
import Sync from './Sync.js'

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
            <Formik
                initialValues={{ title: this.props.base.title }}
                isInitialValid
                validate={validate}
                render={props => (
                    <form className="ui form">
                        <Sync {...props} update={this.updateBase} />
                        <Field name="title" component={FormikInput} label="Title" autoFocus />
                    </form>
                )}
            />
        )
    }
}
