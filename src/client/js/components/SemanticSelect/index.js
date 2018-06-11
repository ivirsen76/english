import React from 'react'
import PropTypes from 'prop-types'
import FieldWrapper from '../SemanticFieldWrapper'
import _pick from 'lodash/pick'

export default class Component extends React.Component {
    static propTypes = {
        input: PropTypes.object,
        label: PropTypes.node,
        options: PropTypes.array,
        className: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    }

    static defaultProps = {
        className: 'ui dropdown',
    }

    render() {
        const { input, label, options } = this.props
        const props = _pick(this.props, ['className', 'style'])

        return (
            <FieldWrapper {...this.props}>
                <label htmlFor={input.name}>{label}</label>
                <select {...input} {...props}>
                    {options.map(item => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </FieldWrapper>
        )
    }
}
