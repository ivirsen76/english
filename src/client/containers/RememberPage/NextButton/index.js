import React from 'react'
import PropTypes from 'prop-types'

export default class Component extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    }

    render() {
        return (
            <button className="ui icon button" onClick={this.props.onClick}>
                <i className="icon-arrow-right" />
            </button>
        )
    }
}
