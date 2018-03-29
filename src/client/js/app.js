// Import common global styles
import '../styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { App, createStore } from '@ieremeev/boilerplate';
import reducers from './reducers.js';
import Routes from './routes.js';

const store = createStore(reducers);

ReactDOM.render(
    <App store={store}>
        <Routes />
    </App>,
    document.getElementById('app')
);
