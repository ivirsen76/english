import React from 'react'
import PropTypes from 'prop-types'
import { logout } from 'client/js/utils/auth'

export default class Component extends React.Component {
    static propTypes = {
        history: PropTypes.object,
    }

    componentDidMount() {
        logout()
        this.props.history.push('/')
    }

    render() {
        return null
    }
}
