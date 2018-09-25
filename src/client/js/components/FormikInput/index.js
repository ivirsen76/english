import React from 'react'
import PropTypes from 'prop-types'
import FieldWrapper from '../FormikFieldWrapper'

export default class FormikInput extends React.Component {
    static propTypes = {
        field: PropTypes.object,
        form: PropTypes.object,
        label: PropTypes.node,
    }

    render() {
        const { field, label } = this.props

        return (
            <FieldWrapper {...this.props}>
                {label && <label htmlFor={field.name}>{label}</label>}
                <input {...field} />
            </FieldWrapper>
        )
    }
}
