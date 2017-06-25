import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getWriteCurrentCard, getNextWriteCardSounds } from 'selectors/card'
import { setWriteCards } from 'reducers/card'
import Counter from '../RememberPage/Counter'

class Component extends React.Component {
    static propTypes = {
        setWriteCards: PropTypes.func,
        currentCardNumber: PropTypes.number,
        totalCards: PropTypes.number,
    }

    componentDidMount() {
        this.props.setWriteCards()
    }

    render() {
        const { currentCardNumber, totalCards } = this.props

        return (
            <div>
                <h2>Написание</h2>
                <Counter current={currentCardNumber} total={totalCards} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalCards: state.card.write.list.length,
        currentCardNumber: state.card.write.currentCardIndex + 1,
        currentCard: getWriteCurrentCard(state),
        enLanguage: 'us',
        nextSounds: getNextWriteCardSounds(state),
    }
}

export default connect(mapStateToProps, {
    setWriteCards,
})(Component)
