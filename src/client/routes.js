import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import App from 'components/App'
import HomePage from 'components/HomePage'
import LoginPage from 'components/LoginPage'
import LogoutPage from 'components/LogoutPage'
import FeaturesPage from 'components/FeaturesPage'
import UserArea from 'components/UserArea'
import CardsPage from 'components/CardsPage'
import RememberPage from 'components/RememberPage'
import NotFoundPage from 'components/NotFoundPage'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="features" component={FeaturesPage} />
        <Route path="login" component={LoginPage} />
        <Route path="logout" component={LogoutPage} />
        <Route path="user" component={UserArea}>
            <IndexRedirect to="cards" />
            <Route path="cards" component={CardsPage} />
            <Route path="remember" component={RememberPage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
    </Route>
)
