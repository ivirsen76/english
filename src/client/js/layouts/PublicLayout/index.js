import React from 'react'
import PropTypes from 'prop-types'
import NavBar from 'js/components/NavBar'

export default class Component extends React.Component {
    static propTypes = {
        children: PropTypes.node,
    }

    render() {
        return (
            <div className="ui container">
                <NavBar />
                {this.props.children}
            </div>
        )
    }
}
