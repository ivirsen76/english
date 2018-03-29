import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import style from './style.module.scss'

export default class SoundIcon extends React.Component {
    static propTypes = {
        iconPosition: PropTypes.string,
        isSound: PropTypes.bool,
        toggleSound: PropTypes.func,
    }

    render() {
        const className = classnames(
            style.sound,
            style[this.props.iconPosition],
            { [style.on]: this.props.isSound },
            { [style.off]: !this.props.isSound }
        )

        return <div className={className} onClick={this.props.toggleSound} />
    }
}
