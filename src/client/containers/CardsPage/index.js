import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Cards from 'components/Cards'
import AddCard from 'components/AddCard'
import { addCard, deleteCard, updateCard } from 'reducers/card'
import { getNextNewId, getLatestLabel } from 'selectors/card'

// eslint-disable-next-line react/prefer-stateless-function
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
                <Cards data={this.props.list} deleteCard={this.props.deleteCard} updateCard={this.props.updateCard} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.card.list,
        nextNewId: getNextNewId(state),
        latestLabel: getLatestLabel(state),
    }
}

export default connect(mapStateToProps, {
    addCard,
    deleteCard,
    updateCard,
})(Component)
