import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from 'js/reducers/auth'
import Form from './form'

class Component extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
    }

    login = values => login(this.props.dispatch, values)

    render() {
        return <Form onSubmit={this.login} />
    }
}

export default connect()(Component)
