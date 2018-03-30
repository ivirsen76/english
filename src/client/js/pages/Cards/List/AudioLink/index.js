import React from 'react'
import PropTypes from 'prop-types'
import mp3 from 'js/utils/mp3.js'

export default class Component extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        audioUrl: PropTypes.string,
    }

    play = e => {
        e.preventDefault()
        mp3.play(process.env.REACT_APP_AWS_S3_PUBLIC_URL + 'sounds/' + this.props.audioUrl)
    }

    render() {
        const { text, audioUrl } = this.props

        return (
            <div>
                {audioUrl ? (
                    <a href="" onClick={this.play}>
                        {text}
                    </a>
                ) : (
                    <div>
                        {text} <div className="ui tiny active inline loader" />
                    </div>
                )}
            </div>
        )
    }
}