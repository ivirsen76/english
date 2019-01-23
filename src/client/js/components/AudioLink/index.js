import React from 'react'
import PropTypes from 'prop-types'
import { play } from 'client/js/utils/mp3.js'
import { getMediaUrl } from 'client/js/utils/media.js'

export default class Component extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        audioUrl: PropTypes.string,
    }

    play = e => {
        e.preventDefault()
        play(getMediaUrl(this.props.audioUrl))
    }

    render() {
        const { text, audioUrl } = this.props

        return (
            <div>
                {audioUrl ? (
                    <a href={getMediaUrl(audioUrl)} onClick={this.play}>
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
