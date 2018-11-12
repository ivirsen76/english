import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import IconSoundOn from '@ieremeev/icons/volume-high'
import IconSoundOff from '@ieremeev/icons/volume-mute2'
import style from './style.module.scss'

export default class SoundIcon extends React.Component {
    static propTypes = {
        iconPosition: PropTypes.string,
        isSound: PropTypes.bool,
        toggleSound: PropTypes.func,
    }

    render() {
        const className = classnames(style.sound, style[this.props.iconPosition])

        return (
            <div className={className} onClick={this.props.toggleSound}>
                {this.props.isSound ? <IconSoundOn /> : <IconSoundOff />}
            </div>
        )
    }
}
