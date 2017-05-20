import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import SoundIcon from '../soundIcon.js'
import style from './style.module.scss'
// import { play } from 'helpers/mp3.js'

const play = () => {}
// const App = window.znanium.app
const App = {}

export default class Component extends React.Component {
    static propTypes = {
        word: PropTypes.string,
        language: PropTypes.string,
        isSound: PropTypes.bool,
        soundFile: PropTypes.string,
        iconPosition: PropTypes.string,
        show: PropTypes.bool,
        toggleSound: PropTypes.func,
    }

    static defaultProps = {
        show: true,
        iconPosition: 'bottom',
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.show && this.props.isSound) {
            if (
                prevProps.word !== this.props.word ||
                prevProps.show !== this.props.show ||
                prevProps.isSound !== this.props.isSound
            ) {
                this.playSound()
            }
        }
    }

    toggleSound = () => {
        this.props.toggleSound(this.props.language)
    }

    playSound = event => {
        if (event) {
            event.preventDefault()
        }

        if (this.props.soundFile) {
            play(App.asset(this.props.soundFile))
        }
    }

    render() {
        let flagClass = classnames(style.language, style[this.props.language], style[this.props.iconPosition])

        let soundClass = classnames(
            style.sound,
            style[this.props.iconPosition],
            { [style.on]: this.props.isSound },
            { [style.off]: !this.props.isSound }
        )

        let word
        if (!this.props.show) {
            word = null
        } else if (this.props.soundFile) {
            word = <a onClick={this.playSound}>{this.props.word}</a>
        } else {
            word = this.props.word
        }

        return (
            <div className={style.panel}>
                <div className={flagClass} />
                <SoundIcon classnames={soundClass} onClick={this.toggleSound} />
                <div className={style.word}>
                    {word}
                </div>
            </div>
        )
    }
}
