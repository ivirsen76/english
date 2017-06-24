import React from 'react'
import PropTypes from 'prop-types'
import EditCard from 'components/CardsPage/EditCard'

export default class EditButton extends React.Component {
    static propTypes = {
        card: PropTypes.object,
        updateCard: PropTypes.func,
    }
    render() {
        const trigger = (
            <button className="ui tiny green icon button">
                <i className="icon-pencil" />
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
