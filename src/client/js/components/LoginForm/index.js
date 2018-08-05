import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from 'client/js/reducers/auth'
import Form from './form'
import { withRouter } from 'react-router-dom'

class Component extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        history: PropTypes.object,
    }

    login = async values => {
        const { dispatch, history } = this.props

        await login(dispatch, values)
        history.push('/user/cards')
    }

    render() {
        return <Form onSubmit={this.login} />
    }
}

export default withRouter(connect()(Component))
