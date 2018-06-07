/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import TopMenu from 'js/components/TopMenu';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import HomePage from 'js/components/HomePage';
import LoginPage from 'js/components/LoginPage';
import LogoutPage from 'js/components/LogoutPage';
import FeaturesPage from 'js/components/FeaturesPage';
import UserArea from 'js/components/UserArea';
import NotFoundPage from 'js/components/NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool,
        user: PropTypes.object,
    };

    render() {
        return (
            <div className="ui container">
                <TopMenu isLoggedIn={this.props.isLoggedIn} user={this.props.user} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/features" component={FeaturesPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/logout" component={LogoutPage} />
                    <Route path="/user" component={UserArea} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: !!state.auth.token,
        user: state.auth.user,
    };
}

export default connect(mapStateToProps)(App);
