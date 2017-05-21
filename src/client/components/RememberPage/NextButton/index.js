import React from 'react'
import PropTypes from 'prop-types'

export default class Component extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    }

    render() {
        return (
            <a className="ui icon button" onClick={this.props.onClick}>
                <i className="icon-arrow-right" />
            </a>
        )
    }
}
