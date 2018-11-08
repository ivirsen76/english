import React from 'react'
import PropTypes from 'prop-types'
import EditCard from 'client/js/pages/Cards/EditCard'
import IconPencil from '@ieremeev/icons/pencil'

export default class EditButton extends React.Component {
    static propTypes = {
        card: PropTypes.object,
        updateCard: PropTypes.func,
    }
    render() {
        const trigger = (
            <button className="ui tiny green icon button">
                <IconPencil />
            </button>
        )

        return (
            <EditCard
                trigger={trigger}
                initialValues={this.props.card}
                updateCard={this.props.updateCard}
            />
        )
    }
}
