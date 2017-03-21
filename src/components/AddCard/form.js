import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from 'components/SemanticInput';


const validate = (values) => {
    const errors = {};

    if (!values.text || values.text === '') {
        errors.text = 'Вы должны ввести текст';
    }
    if (!values.translate || values.translate === '') {
        errors.translate = 'Вы должны ввести перевод';
    }

    return errors;
};


class Component extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="ui form">
                <Field name="text" component={Input} label="Текст" autoFocus />
                <Field name="translate" component={Input} label="Перевод" />
                <Field name="label" component={Input} label="Метка" />

                <button className="ui button" type="submit">Add card</button>
            </form>
        );
    }
}

export default reduxForm({
    validate,
})(Component);
