import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import WordsPage from './containers/WordsPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="words" component={WordsPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);
