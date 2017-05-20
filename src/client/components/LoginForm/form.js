import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from 'components/SemanticInput'
import isEmail from 'validator/lib/isEmail'

export const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = 'Email is required'
    } else if (!isEmail(values.email)) {
        errors.email = 'Email is invalid'
    }

    return errors
}

class LoginForm extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool,
    }

    render() {
        const { handleSubmit, submitting } = this.props

        return (
            <form onSubmit={handleSubmit} className="ui form">
                <Field name="email" component={Input} label="Email" autoFocus />
                <Field name="password" component={Input} label="Пароль" type="password" />

                <button className={'ui ' + (submitting && 'loading') + ' compact button'} type="submit">
                    Войти
                </button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'LoginForm',
    validate,
})(LoginForm)
