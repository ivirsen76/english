import React from 'react'
import { connect } from 'react-redux'

// eslint-disable-next-line react/prefer-stateless-function
class Component extends React.Component {
    render() {
        return (
            <div>
                <h2>Возможности</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Component)
