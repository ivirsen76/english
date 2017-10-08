import React from 'react'
import ReactDOM from 'react-dom'
import cookie from 'js-cookie'
import configureStore, { history } from './store/configureStore'
import { authenticate } from 'reducers/auth'
import Root from './components/Root'
import 'semantic-ui-css/semantic.css'
import './styles/app.css'
import './styles/icomoon.css'
// import registerServiceWorker from './registerServiceWorker'

const store = configureStore()
const token = cookie.get('token')
if (token) {
    store.dispatch(authenticate(token))
}

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'))
// registerServiceWorker()
