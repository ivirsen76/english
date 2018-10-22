// Import common global styles
import '../styles/app.css'
import '../styles/semantic-ui/semantic.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { App, createStore, history } from '@ieremeev/boilerplate'
import reducers from './reducers.js'
import Routes from './Routes.js'
import axios from '@ieremeev/axios'
import cookie from 'js-cookie'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { setCurrentUserFromToken } from './utils/auth.js'

const start = async () => {
    const store = createStore(reducers)

    // Setup axios
    axios.defaults.baseURL = `${process.env.IE_SERVER_URL}`
    axios.setLoginRedirect(() => {
        history.push('/login')
    })
    const token = cookie.get('token')
    if (token) {
        axios.setToken(token)
        await setCurrentUserFromToken()
    }

    const Root = DragDropContext(HTML5Backend)(() => (
        <App store={store}>
            <Routes />
        </App>
    ))

    ReactDOM.render(<Root />, document.getElementById('app'))
}
start()
