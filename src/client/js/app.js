// Import common global styles
import '../styles/app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { App, createStore } from '@ieremeev/boilerplate'
import reducers from './reducers.js'
import Routes from './Routes.js'
import { setToken } from './reducers/auth.js'

const store = createStore(reducers)

// Set token
const token = store.getState().app.auth.token
if (token) {
    store.dispatch(setToken(token))
}

ReactDOM.render(
    <App store={store}>
        <Routes />
    </App>,
    document.getElementById('app')
)
