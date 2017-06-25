import React from 'react'
import PropTypes from 'prop-types'

export default class InputField extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
    }

    onChange = e => {
        e && e.preventDefault()
        this.props.onChange(e.target.value)
    }

    render() {
        return (
            <div className="ui form">
                <input
                    type="text"
                    value={this.props.value}
                    onChange={this.onChange}
                    placeholder="Type the listened text"
                    autoFocus
                />
            </div>
        )
    }
}
