import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <IndexLink to="/">Home</IndexLink>
                {' | '}
                <Link to="/words">Words</Link>
                <br />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element,
};

export default App;
