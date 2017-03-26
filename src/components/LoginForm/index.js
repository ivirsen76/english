import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from 'components/SemanticInput';


class LoginForm extends React.Component {
    static propTypes = {
        handleLogin: PropTypes.func,
    };

    handleLogin = (values) => {
        this.props.handleLogin(values);
    }

    render() {
        return (
            <form onSubmit={this.handleLogin} className="ui form">
                <Field name="email" component={Input} label="Email" autoFocus />
                <Field name="password" component={Input} label="Пароль" type="password" />

                <button className="ui compact button" type="submit">Войти</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'LoginForm',
})(LoginForm);
