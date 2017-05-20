import React from 'react'
import PropTypes from 'prop-types'

export default class Component extends React.Component {
    static propTypes = {
        current: PropTypes.number,
        total: PropTypes.number,
    }

    render() {
        return <div>{this.props.current + ' / ' + this.props.total}</div>
    }
}
