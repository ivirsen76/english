import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from 'components/App';
import HomePage from 'containers/HomePage';
import LoginPage from 'containers/LoginPage';
import FeaturesPage from 'containers/FeaturesPage';
import UserArea from 'containers/UserArea';
import CardsPage from 'containers/CardsPage';
import RememberPage from 'containers/RememberPage';
import NotFoundPage from 'components/NotFoundPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="features" component={FeaturesPage} />
        <Route path="login" component={LoginPage} />
        <Route path="user" component={UserArea}>
            <IndexRedirect to="cards" />
            <Route path="cards" component={CardsPage} />
            <Route path="remember" component={RememberPage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
    </Route>
);
