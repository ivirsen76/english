import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _pick from 'lodash/pick'
import { getRememberTotalCards, getRememberCurrentCard } from 'selectors/card'
import {
    setRememberCards,
    goNextRememberCard,
    rememberCard,
    toggleRememberSound,
    switchRememberOrder,
} from 'reducers/card'
import Counter from './Counter'
import EditButton from './EditButton'
import NextButton from './NextButton'
import DeleteButton from './DeleteButton'
import PlayButton from './PlayButton'
import PauseButton from './PauseButton'
import DoneButton from './DoneButton'
import SwitchButton from './SwitchButton'
import GoNextPanel from './GoNextPanel'
import Label from './label.js'
import Panel from './Panel'
import style from './index.module.scss'

class Component extends React.Component {
    static propTypes = {
        totalCards: PropTypes.number,
        currentCardNumber: PropTypes.number,
        currentCard: PropTypes.object,
        step: PropTypes.number,
        // enLanguage: PropTypes.string,
        isEnFirst: PropTypes.bool,
        isPlayMode: PropTypes.bool,
        isEnSound: PropTypes.bool,
        isRuSound: PropTypes.bool,
        label: PropTypes.string,
        setRememberCards: PropTypes.func,
        rememberCard: PropTypes.func,
        goNext: PropTypes.func,
        switchOrder: PropTypes.func,
        togglePlayMode: PropTypes.func,
        toggleSound: PropTypes.func,
        updateCard: PropTypes.func,
    }

    static defaultProps = {
        setRememberCards() {},
        rememberCard() {},
        switchOrder() {},
        togglePlayMode() {},
        toggleSound() {},
        updateCard() {},
    }

    componentDidMount() {
        this.props.setRememberCards()
    }

    getFirstWord = () => ({
        word: this.props.currentCard.text,
        language: 'us',
        isSound: this.props.isEnSound,
    })

    getSecondWord = () => ({
        word: this.props.currentCard.translate,
        language: 'ru',
        isSound: this.props.isRuSound,
    })

    switchOrder = e => {
        e && e.preventDefault()
        this.props.switchOrder()
    }

    goNext = e => {
        e && e.preventDefault()
        this.props.goNext()
    }

    rememberCard = () => {
        this.props.rememberCard(this.props.currentCard.id)
    }

    render() {
        const {
            isEnFirst,
            currentCard,
            currentCardNumber,
            totalCards,
            updateCard,
            step,
            isPlayMode,
            togglePlayMode,
            toggleSound,
            label,
        } = this.props

        let firstWord = isEnFirst ? this.getFirstWord() : this.getSecondWord()
        let secondWord = isEnFirst ? this.getSecondWord() : this.getFirstWord()

        return (
            <div>
                <h2>Запоминание</h2>
                <div className={style.wrapper}>
                    <div className={style.counter}>
                        <Counter current={currentCardNumber} total={totalCards} />
                    </div>

                    <div className={style.mainButtons}>
                        <EditButton card={currentCard} onSuccess={updateCard} />
                        <NextButton onClick={this.goNext} />
                        <DeleteButton />
                    </div>

                    <div className={style.otherButtons}>
                        <div className={style.playPauseButtons}>
                            <PlayButton onClick={togglePlayMode} disabled={isPlayMode} />
                            <PauseButton onClick={togglePlayMode} disabled={!isPlayMode} />
                        </div>

                        <div className={style.doneButton}>
                            <DoneButton onClick={this.rememberCard} />
                        </div>

                        <div className={style.label}>
                            <Label value={label} />
                        </div>
                    </div>

                    <div className={style.panelWrapper}>
                        <SwitchButton onClick={this.switchOrder} />
                        <Panel
                            word={firstWord.word}
                            language={firstWord.language}
                            isSound={firstWord.isSound}
                            soundFile={firstWord.soundFile}
                            toggleSound={toggleSound}
                        />
                        <Panel
                            word={secondWord.word}
                            language={secondWord.language}
                            isSound={secondWord.isSound}
                            soundFile={secondWord.soundFile}
                            show={step === 2}
                            iconPosition="top"
                            toggleSound={toggleSound}
                        />
                    </div>

                    <GoNextPanel onClick={this.goNext} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalCards: getRememberTotalCards(state),
        currentCardNumber: state.card.remember.currentCardIndex + 1,
        currentCard: getRememberCurrentCard(state),
        step: state.card.remember.step,
        enLanguage: 'us',
        ..._pick(state.card.remember.params, ['isEnSound', 'isRuSound', 'isEnFirst']),
    }
}

export default connect(mapStateToProps, {
    setRememberCards,
    goNext: goNextRememberCard,
    rememberCard,
    toggleSound: toggleRememberSound,
    switchOrder: switchRememberOrder,
})(Component)
