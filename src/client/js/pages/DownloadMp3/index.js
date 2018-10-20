import React from 'react'
import { connect } from 'react-redux'
import axios from '@ieremeev/axios'
import classnames from 'classnames'
import { getMediaUrl } from 'client/js/utils/media.js'

class Component extends React.Component {
    state = {
        loading: false,
    }

    download = async () => {
        this.setState({ loading: true })
        const response = await axios.post('/mp3', {})
        const { filename } = response.data
        this.setState({ loading: false })

        window.location = getMediaUrl(`sounds/users/${filename}?${Date.now()}`)
    }

    render() {
        return (
            <div>
                <h2>Download MP3</h2>
                <button
                    className={classnames(
                        'ui',
                        { loading: this.state.loading },
                        'compact primary button'
                    )}
                    onClick={this.download}
                >
                    Download
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Component)
