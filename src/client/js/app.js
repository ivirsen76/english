// Import common global styles
import '../styles/app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { App, createStore, history } from '@ieremeev/boilerplate'
import reducers from './reducers.js'
import Routes from './Routes.js'
import axios from '@ieremeev/axios'
import cookie from 'js-cookie'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

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

const Root = DragDropContext(HTML5Backend)(() => (
    <App store={store}>
        <Routes />
    </App>
))

ReactDOM.render(<Root />, document.getElementById('app'))
