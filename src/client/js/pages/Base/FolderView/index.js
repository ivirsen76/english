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
        showBaseSettings: PropTypes.bool,
        toggleShowBaseSettings: PropTypes.func,
    }

    updateBase = values => {
        this.props.updateBase({ ...values, id: this.props.base.id })
    }

    render() {
        const { showBaseSettings } = this.props

        return (
            <div>
                <h2 id="baseTitle">{this.props.base.title}</h2>
                <div className="ui raised segment">
                    <h3
                        style={{
                            cursor: 'pointer',
                            ...(!showBaseSettings && { marginBottom: '0' }),
                        }}
                        onClick={this.props.toggleShowBaseSettings}
                    >
                        Settings{' '}
                        <i className={`caret ${showBaseSettings ? 'down' : 'left'} icon`} />
                    </h3>
                    {showBaseSettings && (
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
                            prepareValues={values => ({ ...values, price: +values.price })}
                            render={props => (
                                <Form className="ui form">
                                    <Field
                                        name="title"
                                        component={SemanticInput}
                                        label="Title"
                                        showErrorImmediately
                                        autoFocus
                                    />
                                    <div
                                        className="fields"
                                        style={{
                                            ...(!props.values.isMain && { marginBottom: '0' }),
                                        }}
                                    >
                                        <Field
                                            name="arrangeChildren"
                                            component={SemanticSelect}
                                            options={[
                                                { value: 'table', label: 'Table' },
                                                { value: 'list', label: 'List' },
                                            ]}
                                            type="button"
                                        />
                                        <Field
                                            name="isMain"
                                            component={SemanticCheckbox}
                                            label="главная база?"
                                        />
                                    </div>
                                    {props.values.isMain && (
                                        <div>
                                            <Field
                                                name="price"
                                                component={SemanticInput}
                                                label="Стоимость"
                                                showErrorImmediately
                                            />
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
                    )}
                </div>
                <BaseTree base={this.props.base} url="/user/base" />
            </div>
        )
    }
}
