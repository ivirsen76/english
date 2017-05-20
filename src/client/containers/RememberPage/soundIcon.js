import React from 'react'
import PropTypes from 'prop-types'

export default class Component extends React.Component {
    static propTypes = {
        classnames: PropTypes.string,
        onClick: PropTypes.func,
    }

    render() {
        return <div className={this.props.classnames} onClick={this.props.onClick} />
    }
}
