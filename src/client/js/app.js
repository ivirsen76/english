// Import common global styles
import '../styles/app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { App, createStore } from '@ieremeev/boilerplate'
import reducers from './reducers.js'
import Routes from './Routes.js'
import axios from '@ieremeev/axios'

const store = createStore(reducers)

// Set token to axios
const token = store.getState().app.auth.token
if (token) {
    axios.setToken(token)
}

ReactDOM.render(
    <App store={store}>
        <Routes />
    </App>,
    document.getElementById('app')
)
