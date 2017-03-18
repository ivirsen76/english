import React, { PropTypes } from 'react';
import SideMenu from 'components/SideMenu';


export default class Component extends React.Component {
    static propTypes = {
        children: PropTypes.element,
    }

    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideMenu />
                </div>
                <div className="twelve wide column">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
