import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import LoginForm from 'components/LoginForm'
import { logout } from 'reducers/auth'

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

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {
    logout,
})(Component)
