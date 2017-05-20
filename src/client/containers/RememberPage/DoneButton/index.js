import React from 'react'
import PropTypes from 'prop-types'

export default class Component extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    }

    render() {
        return <button className="ui button" onClick={this.props.onClick}>Done</button>
    }
}
