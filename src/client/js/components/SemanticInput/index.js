import React from 'react'
import PropTypes from 'prop-types'
import FieldWrapper from '../SemanticFieldWrapper'
import _pick from 'lodash/pick'

export default class Component extends React.Component {
    static propTypes = {
        input: PropTypes.object,
        label: PropTypes.node,
    }

    render() {
        const { input, label } = this.props
        const props = _pick(this.props, ['autoFocus', 'type'])

        return (
            <FieldWrapper {...this.props}>
                <label htmlFor={input.name}>{label}</label>
                <input {...input} {...props} />
            </FieldWrapper>
        )
    }
}
