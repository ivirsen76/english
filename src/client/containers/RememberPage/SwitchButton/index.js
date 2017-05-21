import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

export default class Component extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    }

    render() {
        return (
            <div
                id="remember-switch-button"
                className={style.switchButton}
                onClick={this.props.onClick}
            />
        )
    }
}
