import React from 'react';
import { Route, NotFound } from '@ieremeev/boilerplate';
import defaultProps from 'recompose/defaultProps.js';
import { Switch } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';

// Pages
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Home from './pages/Home';
import Features from './pages/Features';
import Cards from './pages/Cards';
import Remember from './pages/Remember';
import Write from './pages/Write';
import DownloadMp3 from './pages/DownloadMp3';
import Base from './pages/Base';

// import FlowList from 'bundle-loader?lazy!./pages/FlowList';

// Bind UserLayout by default
const AppRoute = defaultProps({ layout: UserLayout })(Route);

export default () => (
    <Switch>
        <AppRoute path="/" exact component={Home} layout={PublicLayout} />
        <AppRoute path="/features" exact component={Features} layout={PublicLayout} />

        {/* User pages */}
        <AppRoute path="/user/cards" exact component={Cards} />
        <AppRoute path="/user/remember" exact component={Remember} />
        <AppRoute path="/user/write" exact component={Write} />
        <AppRoute path="/user/mp3" exact component={DownloadMp3} />
        <AppRoute path="/user/base" exact component={Base} />

        {/* Not found page */}
        <AppRoute component={NotFound} />
    </Switch>
);
