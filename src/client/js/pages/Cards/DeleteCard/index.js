import React from 'react'
import PropTypes from 'prop-types'

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
                className="ui red compact mini icon button"
                id={`deleteCardButton${this.props.id}`}
                onClick={this.onClick}
            >
                <i className="icon-cross" />
            </button>
        )
    }
}
