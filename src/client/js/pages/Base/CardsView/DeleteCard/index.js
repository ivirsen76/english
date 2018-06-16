import React from 'react'
import PropTypes from 'prop-types'
import notification from '@ieremeev/notification'

export default class Component extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        deleteCard: PropTypes.func,
    }

    onClick = () => {
        this.props.deleteCard(this.props.id)
        notification('Card has been deleted')
    }

    render() {
        return (
            <button
                id={`deleteCardButton${this.props.id}`}
                className="ui red compact mini icon button"
                onClick={this.onClick}
            >
                <i className="icon-cross" />
            </button>
        )
    }
}
