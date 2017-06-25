import React from 'react'
import PropTypes from 'prop-types'
import ClickButton from '@ieremeev/button'

export default class DeleteButton extends React.Component {
    static propTypes = {
        card: PropTypes.object,
        deleteCard: PropTypes.func,
    }

    deleteCard = e => {
        e && e.preventDefault()
        this.props.deleteCard(this.props.card.id)
    }

    render() {
        return (
            <ClickButton
                className="ui tiny red icon button"
                title={<i className="icon-cross" />}
                isConfirm
                onClick={this.deleteCard}
            />
        )
    }
}
