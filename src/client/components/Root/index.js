import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'

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
                    <div>Some</div>
                </ConnectedRouter>
            </Provider>
        )
    }
}
