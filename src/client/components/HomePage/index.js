import React from 'react'
import { connect } from 'react-redux'

class Component extends React.Component {
    render() {
        return (
            <div>
                <h2>Главная</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Component)
