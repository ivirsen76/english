import React from 'react'
import PropTypes from 'prop-types'
import LogoBar from 'client/js/components/LogoBar'
import NavBar from 'client/js/components/NavBar'

export default class Component extends React.Component {
    static propTypes = {
        children: PropTypes.node,
    }

    render() {
        return (
            <div className="ui container">
                <LogoBar />
                <NavBar />
                {this.props.children}
            </div>
        )
    }
}
