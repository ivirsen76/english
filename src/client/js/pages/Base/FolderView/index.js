import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field } from 'formik'
import FormikInput from 'client/js/components/FormikInput'
import _pick from 'lodash/pick'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'

const keys = ['title']

export default class Component extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        updateBase: PropTypes.func,
    }

    render() {
        const baseValues = _pick(this.props.base, keys)

        return (
            <Formik
                initialValues={baseValues}
                validate={values => {
                    const errors = {}

                    // Synchronize with redux
                    if (_isEmpty(errors) && !_isEqual(values, baseValues)) {
                        this.props.updateBase({ ...values, id: this.props.base.id })
                    }

                    return errors
                }}
                render={() => (
                    <form className="ui form">
                        <Field name="title" component={FormikInput} label="Title" />
                    </form>
                )}
            />
        )
    }
}
