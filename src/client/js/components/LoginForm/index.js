import React from 'react'
import PropTypes from 'prop-types'
import { login } from 'client/js/utils/auth'
import { withRouter } from 'react-router-dom'
import { Formik, Form, Field, SemanticInput } from '@ieremeev/formik'
import isEmail from 'validator/lib/isEmail'

const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = 'Email is required'
    } else if (!isEmail(values.email)) {
        errors.email = 'Email is invalid'
    }

    return errors
}

class Component extends React.Component {
    static propTypes = {
        history: PropTypes.object,
    }

    login = async values => {
        const { history } = this.props
        await login(values)
        history.push('/user/cards')
    }

    render() {
        return (
            <Formik
                validate={validate}
                onSubmit={this.login}
                render={({ isSubmitting }) => (
                    <Form className="ui form">
                        <Field name="email" component={SemanticInput} label="Email" autoFocus />
                        <Field
                            name="password"
                            component={SemanticInput}
                            label="Password"
                            type="password"
                        />

                        <button
                            className={'ui ' + (isSubmitting && 'loading') + ' compact button'}
                            type="submit"
                        >
                            Log in
                        </button>
                    </Form>
                )}
            />
        )
    }
}

export default withRouter(Component)
