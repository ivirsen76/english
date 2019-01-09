import React from 'react'
import PropTypes from 'prop-types'
import notification from '@ieremeev/notification'
import IconCross from '@ieremeev/icons/cross'

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
                type="button"
                id={`deleteCardButton${this.props.id}`}
                className="ui compact mini icon button"
                onClick={this.onClick}
            >
                <IconCross />
            </button>
        )
    }
}
