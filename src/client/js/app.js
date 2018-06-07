// Import common global styles
import '../styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { App, createStore } from '@ieremeev/boilerplate';
import reducers from './reducers.js';
import Routes from './Routes.js';
import cookie from 'js-cookie';
import { authenticate } from 'js/reducers/auth';

const store = createStore(reducers);

const token = cookie.get('token');
if (token) {
    store.dispatch(authenticate(token));
}

ReactDOM.render(
    <App store={store}>
        <Routes />
    </App>,
    document.getElementById('app')
);
