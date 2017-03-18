import React, { PropTypes } from 'react';
import TopMenu from 'components/TopMenu';


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <TopMenu />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element,
};
