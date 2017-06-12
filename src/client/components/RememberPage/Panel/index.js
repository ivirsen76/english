import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import style from './style.module.scss'
import mp3 from 'utils/mp3.js'

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

    playSound = e => {
        if (e) e.preventDefault()

        if (this.props.soundFile) {
            mp3.play(process.env.REACT_APP_AWS_S3_PUBLIC_URL + 'sounds/' + this.props.soundFile)
        }
    }

    renderFlag = () => {
        const className = classnames(
            style.language,
            style[this.props.language],
            style[this.props.iconPosition]
        )

        return <div className={className} />
    }

    renderSoundIcon = () => {
        const className = classnames(
            style.sound,
            style[this.props.iconPosition],
            { [style.on]: this.props.isSound },
            { [style.off]: !this.props.isSound }
        )

        return <div className={className} onClick={this.toggleSound} />
    }

    render() {
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
                {this.renderFlag()}
                {this.renderSoundIcon()}
                <div className={style.word} id={`panel_${this.props.language}_word`}>
                    {word}
                </div>
            </div>
        )
    }
}
