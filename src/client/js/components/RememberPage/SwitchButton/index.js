import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.scss'

export default class SwitchButton extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    }

    render() {
        return <div className={style.switchButton} onClick={this.props.onClick} />
    }
}
