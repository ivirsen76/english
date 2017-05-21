import React from 'react'
import PropTypes from 'prop-types'

export default class Component extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
    }

    static defaultProps = {
        onChange() {},
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
                        onChange={this.props.onChange}
                    />
                </div>
            </div>
        )
    }
}
