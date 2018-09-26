import React from 'react'
import { Route, NotFound } from '@ieremeev/boilerplate'
import defaultProps from 'recompose/defaultProps.js'
import { Switch, Redirect } from 'react-router-dom'
import { hasRole } from 'client/js/utils/auth.js'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import UserLayout from './layouts/UserLayout'

// Pages
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Features from './pages/Features'
import Cards from './pages/Cards'
import Remember from './pages/Remember'
import Write from './pages/Write'
import DownloadMp3 from './pages/DownloadMp3'
import Base from './pages/Base'

// import FlowList from 'bundle-loader?lazy!./pages/FlowList';

// Bind UserLayout by default
const AppRoute = defaultProps({ layout: UserLayout })(Route)

export default () => (
    <Switch>
        <AppRoute path="/" exact component={Home} layout={PublicLayout} />
        <AppRoute path="/features" component={Features} layout={PublicLayout} />
        <AppRoute path="/login" component={Login} layout={PublicLayout} />
        <AppRoute path="/logout" component={Logout} layout={PublicLayout} />

        {/* User pages */}
        <Redirect exact from="/user" to="/user/cards" />
        <AppRoute path="/user/cards" component={Cards} />
        <AppRoute path="/user/remember" component={Remember} />
        <AppRoute path="/user/write" component={Write} />
        <AppRoute path="/user/mp3" component={DownloadMp3} />
        {hasRole('admin') && <AppRoute path="/user/base/:id?" component={Base} />}

        {/* Not found page */}
        <AppRoute component={NotFound} />
    </Switch>
)
