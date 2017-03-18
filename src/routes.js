import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import WordsPage from './containers/WordsPage';
import RememberPage from './containers/RememberPage';
import UserArea from './containers/UserArea';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="user" component={UserArea}>
            <Route path="words" component={WordsPage} />
            <Route path="remember" component={RememberPage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
    </Route>
);
