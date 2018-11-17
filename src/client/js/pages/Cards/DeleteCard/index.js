import React from 'react'
import PropTypes from 'prop-types'
import IconCross from '@ieremeev/icons/cross'

export default class Component extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        deleteCard: PropTypes.func,
    }

    onClick = () => {
        this.props.deleteCard(this.props.id)
    }

    render() {
        return (
            <button
                className="ui compact mini icon button"
                id={`deleteCardButton${this.props.id}`}
                onClick={this.onClick}
            >
                <IconCross />
            </button>
        )
    }
}
