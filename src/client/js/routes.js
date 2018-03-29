import React from 'react';
import { Route, NotFound } from '@ieremeev/boilerplate';
import defaultProps from 'recompose/defaultProps.js';
import { Switch } from 'react-router-dom';

// Layouts
import FixedLayout from './layouts/FixedLayout';

// Pages
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Welcome from './pages/Welcome'; // Include it into main bundle
// import FlowList from 'bundle-loader?lazy!./pages/FlowList';

// Bind FixedLayout by default
const AppRoute = defaultProps({ layout: FixedLayout })(Route);

export default () => (
    <Switch>
        <AppRoute path="/" component={Welcome} exact />

        {/* Not found page */}
        <AppRoute component={NotFound} />
    </Switch>
);
