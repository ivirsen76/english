import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getWriteCurrentCard, getNextWriteCardSounds } from 'selectors/card'
import { setWriteCards, goNextWriteCard } from 'reducers/card'
import mp3 from 'utils/mp3.js'
import Counter from '../RememberPage/Counter'
import style from './index.module.scss'

class Component extends React.Component {
    static propTypes = {
        setWriteCards: PropTypes.func,
        goNextWriteCard: PropTypes.func,
        currentCardNumber: PropTypes.number,
        totalCards: PropTypes.number,
        nextSounds: PropTypes.array,
        currentCard: PropTypes.object,
    }

    componentDidMount() {
        this.props.setWriteCards()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentCard.text !== this.props.currentCard.text) {
            this.playSound()
        }

        if (process.env.NODE_ENV !== 'test') {
            // Preload mp3 for the next card
            this.props.nextSounds.map(soundFile =>
                mp3.preload(process.env.REACT_APP_AWS_S3_PUBLIC_URL + 'sounds/' + soundFile)
            )
        }
    }

    playSound = e => {
        const currentCard = this.props.currentCard
        e && e.preventDefault()

        mp3.play(process.env.REACT_APP_AWS_S3_PUBLIC_URL + 'sounds/' + currentCard.usSoundFile)
    }

    goNext = e => {
        e && e.preventDefault()
        this.props.goNextWriteCard()
    }

    render() {
        const { currentCardNumber, totalCards } = this.props

        return (
            <div>
                <h2>Написание</h2>
                <div className={style.wrapper}>
                    <div className={style.counter}>
                        <Counter current={currentCardNumber} total={totalCards} />
                    </div>
                    <button onClick={this.goNext}>Next</button>
                </div>
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
    goNextWriteCard,
})(Component)
