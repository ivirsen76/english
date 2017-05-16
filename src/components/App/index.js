import React, { PropTypes } from 'react'
import TopMenu from 'components/TopMenu'
import { connect } from 'react-redux'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool,
        user: PropTypes.object,
        children: PropTypes.element,
    }

    render() {
        return (
            <div className="ui container">
                <TopMenu isLoggedIn={this.props.isLoggedIn} user={this.props.user} />
                {this.props.children}
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
