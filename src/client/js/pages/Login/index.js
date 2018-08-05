import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from 'client/js/components/LoginForm'
import { logout } from 'client/js/reducers/auth'

class Component extends React.Component {
    static propTypes = {
        logout: PropTypes.func,
    }

    componentDidMount() {
        this.props.logout()
    }

    render() {
        return (
            <div style={{ maxWidth: '300px' }}>
                <LoginForm />
            </div>
        )
    }
}

export default connect(null, { logout })(Component)
