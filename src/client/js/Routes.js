import React from 'react'
import { Route, NotFound } from '@ieremeev/boilerplate'
import defaultProps from 'recompose/defaultProps.js'
import { Switch, Redirect } from 'react-router-dom'
import { hasRole } from 'client/js/utils/auth.js'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import UserLayout from './layouts/UserLayout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import ComingSoon from './pages/ComingSoon'
import Cards from './pages/Cards'
import Remember from './pages/Remember'
import Write from './pages/Write'
import DownloadMp3 from './pages/DownloadMp3'
import Base from './pages/Base'
import BaseBrowser from './pages/BaseBrowser'

// Bind PublicLayout by default
const AppRoute = defaultProps({ layout: PublicLayout })(Route)

export default () => (
    <Switch>
        <AppRoute path="/" exact component={Home} />
        <AppRoute path="/login" component={Login} />
        <AppRoute path="/logout" component={Logout} />
        <AppRoute path="/features" component={ComingSoon} />
        <AppRoute path="/bases/:id?" component={BaseBrowser} />
        <AppRoute path="/helpers" component={ComingSoon} />

        {/* User pages */}
        <Redirect exact from="/user" to="/user/cards" />
        <AppRoute path="/user/cards" component={Cards} layout={UserLayout} />
        <AppRoute path="/user/baseBrowser/:id?" component={BaseBrowser} layout={UserLayout} />
        <AppRoute path="/user/remember" component={Remember} layout={UserLayout} />
        <AppRoute path="/user/write" component={Write} layout={UserLayout} />
        <AppRoute path="/user/mp3" component={DownloadMp3} layout={UserLayout} />
        {hasRole('admin') && (
            <AppRoute path="/user/base/:id?" component={Base} layout={UserLayout} />
        )}

        {/* Not found page */}
        <AppRoute component={NotFound} />
    </Switch>
)
