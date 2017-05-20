import React from 'react'
import PropTypes from 'prop-types'
import EditCard from 'components/EditCard'

export default class Component extends React.Component {
    static propTypes = {
        card: PropTypes.object,
        onSuccess: PropTypes.func,
    }
    render() {
        let trigger = (
            <button className="ui icon button">
                <i className="icon-pencil" />
            </button>
        )

        return <EditCard row={this.props.card} onSuccess={this.props.onSuccess} trigger={trigger} />
    }
}
