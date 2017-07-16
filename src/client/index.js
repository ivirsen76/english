import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import cookie from 'js-cookie'
import { authenticate } from 'reducers/auth'
import 'semantic-ui-css/semantic.css'
import './styles/app.css'
import './styles/icomoon.css'
import routes from './routes'
import configureStore from './store/configureStore'
// import registerServiceWorker from './registerServiceWorker'

const store = configureStore()
const token = cookie.get('token')
if (token) {
    store.dispatch(authenticate(token))
}

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
)
// registerServiceWorker()
