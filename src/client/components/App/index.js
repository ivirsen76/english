import React from 'react'
import PropTypes from 'prop-types'
import TopMenu from 'components/TopMenu'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import HomePage from 'components/HomePage'
import LoginPage from 'components/LoginPage'
import LogoutPage from 'components/LogoutPage'
import FeaturesPage from 'components/FeaturesPage'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool,
        user: PropTypes.object,
    }

    render() {
        return (
            <div className="ui container">
                <TopMenu isLoggedIn={this.props.isLoggedIn} user={this.props.user} />
                <Route exact path="/" component={HomePage} />
                <Route path="/features" component={FeaturesPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={LogoutPage} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: !!state.auth.token,
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(App)
