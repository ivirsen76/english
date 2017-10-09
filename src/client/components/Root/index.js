import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import App from '../App'

export default class Component extends React.Component {
    static propTypes = {
        store: PropTypes.object,
        history: PropTypes.object,
    }

    render() {
        const { store, history } = this.props

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Route component={App} />
                </ConnectedRouter>
            </Provider>
        )
    }
}