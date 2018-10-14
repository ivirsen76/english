import React from 'react'
import PropTypes from 'prop-types'
import BaseTree from 'client/js/components/BaseTree'
import _pick from 'lodash/pick'
import isInt from 'validator/lib/isInt'
import {
    Formik,
    Form,
    Field,
    SemanticInput,
    SemanticSelect,
    SemanticCheckbox,
    SemanticTextarea,
} from '@ieremeev/formik'

export const errorMessages = {
    noTitle: 'You have to provide title',
    invalidPrice: 'Нужно число',
}

export const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = errorMessages.noTitle
    }

    if (values.isMain && values.price) {
        if (!isInt(values.price.toString(), { min: 0 })) {
            errors.price = errorMessages.invalidPrice
        }
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
                <div className="ui raised segment">
                    <Formik
                        initialValues={_pick(this.props.base, [
                            'title',
                            'arrangeChildren',
                            'isMain',
                            'price',
                            'info',
                        ])}
                        isInitialValid
                        validate={validate}
                        onValidChange={this.updateBase}
                        render={props => (
                            <Form className="ui form">
                                <Field
                                    name="title"
                                    component={SemanticInput}
                                    label="Title"
                                    showErrorImmediately
                                    autoFocus
                                />
                                <Field
                                    name="isMain"
                                    component={SemanticCheckbox}
                                    label="главная база?"
                                />
                                {props.values.isMain && (
                                    <div>
                                        <div className="fields">
                                            <Field
                                                name="arrangeChildren"
                                                component={SemanticSelect}
                                                label="Порядок"
                                                options={[
                                                    { value: 'table', label: 'Table' },
                                                    { value: 'list', label: 'List' },
                                                ]}
                                                type="button"
                                            />
                                            <Field
                                                name="price"
                                                component={SemanticInput}
                                                label="Стоимость"
                                                showErrorImmediately
                                            />
                                        </div>
                                        <Field
                                            name="info"
                                            component={SemanticTextarea}
                                            label="Информация"
                                            style={{ height: '5em', minHeight: '5em' }}
                                        />
                                    </div>
                                )}
                            </Form>
                        )}
                    />
                </div>
                <BaseTree base={this.props.base} url="/user/base" />
            </div>
        )
    }
}
