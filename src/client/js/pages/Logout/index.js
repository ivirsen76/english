import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from 'js/reducers/auth'
import history from '../../store/history'

class Component extends React.Component {
    static propTypes = {
        logout: PropTypes.func,
    }

    componentDidMount() {
        this.props.logout()
        history.push('/')
    }

    render() {
        return null
    }
}

export default connect(null, { logout })(Component)
