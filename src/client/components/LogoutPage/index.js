import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from 'reducers/auth'
import { browserHistory } from 'react-router'

class Component extends React.Component {
    static propTypes = {
        logout: PropTypes.func,
    }

    componentDidMount() {
        this.props.logout()
        browserHistory.push('/')
    }

    render() {
        return null
    }
}

export default connect(null, { logout })(Component)
