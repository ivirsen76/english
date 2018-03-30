import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.scss'

export default class Icon extends React.Component {
    static propTypes = {
        type: PropTypes.string,
    }

    render() {
        return <i className={`icon-${this.props.type} ${style.icon}`} />
    }
}
