/* eslint-disable import/default */

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import cookie from 'react-cookie';
import { setToken } from 'reducers/auth';
import { loadCards } from 'reducers/card';
import 'semantic-ui-css/semantic.css';
import './styles/app.css';
import './styles/icomoon.css';
import routes from './routes';
import configureStore from './store/configureStore';

require('./favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore();
const token = cookie.load('token');
if (token) {
    store.dispatch(setToken(token));
    store.dispatch(loadCards());
}

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>, document.getElementById('app')
);
