import React from 'react'
import { connect } from 'react-redux'
import axios from 'utils/axios'

class Component extends React.Component {
    download = () => {
        axios.post('/mp3', {})
    }

    render() {
        return (
            <div>
                <h2>Download MP3</h2>
                <button className="ui compact primary button" onClick={this.download}>
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
