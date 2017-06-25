import React from 'react'
import PropTypes from 'prop-types'

export default class Label extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
    }

    onChange = e => {
        this.props.onChange(e.target.value)
    }

    render() {
        return (
            <div className="ui form">
                <div className="inline field">
                    <label>Label</label>
                    <input
                        type="text"
                        style={{ width: '6em' }}
                        value={this.props.value}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}
