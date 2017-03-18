import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from 'components/App';
import HomePage from 'containers/HomePage';
import FeaturesPage from 'containers/FeaturesPage';
import UserArea from 'containers/UserArea';
import WordsPage from 'containers/WordsPage';
import RememberPage from 'containers/RememberPage';
import NotFoundPage from 'components/NotFoundPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="features" component={FeaturesPage} />
        <Route path="user" component={UserArea}>
            <IndexRedirect to="words" />
            <Route path="words" component={WordsPage} />
            <Route path="remember" component={RememberPage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
    </Route>
);
