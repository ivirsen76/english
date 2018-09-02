// Import common global styles
import '../styles/app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { App, createStore, history } from '@ieremeev/boilerplate'
import reducers from './reducers.js'
import Routes from './Routes.js'
import axios from '@ieremeev/axios'
import cookie from 'js-cookie'

const store = createStore(reducers)

// Setup axios
axios.defaults.baseURL = `//${process.env.IE_SERVER_HOST}:${process.env.IE_SERVER_PORT}`
const token = cookie.get('token')
if (token) {
    axios.setToken(token)
}
axios.setLoginRedirect(() => {
    history.push('/login')
})

ReactDOM.render(
    <App store={store}>
        <Routes />
    </App>,
    document.getElementById('app')
)
