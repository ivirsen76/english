import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addCard, deleteCard, updateCard } from 'client/js/reducers/card'
import { getNextNewId, getLatestLabel } from 'client/js/selectors/card'
import List from './List'
import AddCard from './AddCard'

class Component extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        addCard: PropTypes.func.isRequired,
        deleteCard: PropTypes.func.isRequired,
        updateCard: PropTypes.func.isRequired,
        nextNewId: PropTypes.number.isRequired,
        latestLabel: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div>
                <h2>Мои слова</h2>
                <div className="margin1">
                    <AddCard
                        addCard={this.props.addCard}
                        nextNewId={this.props.nextNewId}
                        latestLabel={this.props.latestLabel}
                    />
                </div>
                <List
                    data={this.props.list}
                    deleteCard={this.props.deleteCard}
                    updateCard={this.props.updateCard}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.app.card.list,
    nextNewId: getNextNewId(state.app.card),
    latestLabel: getLatestLabel(state.app.card),
})

export default connect(mapStateToProps, {
    addCard,
    deleteCard,
    updateCard,
})(Component)
