import React from 'react'
import LoginForm from 'client/js/components/LoginForm'
import { logout } from 'client/js/utils/auth'

export default class Component extends React.Component {
    componentDidMount() {
        logout()
    }

    render() {
        return (
            <div style={{ maxWidth: '300px' }}>
                <LoginForm />
            </div>
        )
    }
}
