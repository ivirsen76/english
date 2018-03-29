import React from 'react';
import PropTypes from 'prop-types';

export default class Component extends React.Component {
    static propTypes = {
        children: PropTypes.node,
    };

    render() {
        return (
                <div className="ui container">{this.props.children}</div>
        );
    }
}
