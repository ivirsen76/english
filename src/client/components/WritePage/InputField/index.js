import React from 'react'
import PropTypes from 'prop-types'
import writeStyle from '../index.module.scss'

export default class InputField extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
        height: PropTypes.number,
    }

    onChange = e => {
        e && e.preventDefault()
        this.props.onChange(e.target.value)
    }

    render() {
        return (
            <textarea
                type="text"
                className={writeStyle.input}
                value={this.props.value}
                onChange={this.onChange}
                style={{ height: this.props.height }}
                autoFocus
            />
        )
    }
}
