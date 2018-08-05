import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from 'client/js/reducers/auth'

class Component extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        logout: PropTypes.func,
    }

    componentDidMount() {
        this.props.logout()
        this.props.history.push('/')
    }

    render() {
        return null
    }
}

export default connect(null, { logout })(Component)
