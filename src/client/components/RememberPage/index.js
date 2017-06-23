import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _pick from 'lodash/pick'
import mp3 from 'utils/mp3.js'
import {
    getRememberTotalCards,
    getRememberCurrentCard,
    getNextRememberCardSounds,
    getNextStepDelay,
    getRememberFirstWord,
    getRememberSecondWord,
} from 'selectors/card'
import {
    setRememberCards,
    goNextRememberCard,
    rememberCard,
    toggleRememberSound,
    toggleRememberPlayMode,
    switchRememberOrder,
    updateRememberLabel,
    updateCard,
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
        firstWord: PropTypes.object,
        secondWord: PropTypes.object,
        step: PropTypes.number,
        // enLanguage: PropTypes.string,
        isAutoPlayMode: PropTypes.bool,
        label: PropTypes.string,
        setRememberCards: PropTypes.func,
        rememberCard: PropTypes.func,
        goNext: PropTypes.func,
        switchOrder: PropTypes.func,
        togglePlayMode: PropTypes.func,
        toggleSound: PropTypes.func,
        updateCard: PropTypes.func,
        updateLabel: PropTypes.func,
        nextSounds: PropTypes.array,
        nextStepDelay: PropTypes.number,
    }

    componentDidMount() {
        this.props.setRememberCards()
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAutoPlayMode && !prevProps.isAutoPlayMode) {
            this.scheduleNext(500)
        } else if (!this.props.isAutoPlayMode && prevProps.isAutoPlayMode) {
            clearTimeout(this.timeout)
        } else if (
            this.props.isAutoPlayMode &&
            (prevProps.step !== this.props.step ||
                prevProps.currentCard.id !== this.props.currentCard.id)
        ) {
            this.scheduleNext(this.props.nextStepDelay)
        }

        if (process.env.NODE_ENV !== 'test') {
            // Preload mp3 for the next card
            this.props.nextSounds.map(soundFile =>
                mp3.preload(process.env.REACT_APP_AWS_S3_PUBLIC_URL + 'sounds/' + soundFile)
            )
        }
    }

    scheduleNext = delay => {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(this.goNext, delay)
    }

    switchOrder = e => {
        e && e.preventDefault()
        this.props.switchOrder()
    }

    togglePlayMode = e => {
        e && e.preventDefault()
        this.props.togglePlayMode()
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
            currentCard,
            currentCardNumber,
            totalCards,
            step,
            isAutoPlayMode,
            toggleSound,
            label,
            firstWord,
            secondWord,
        } = this.props

        return (
            <div>
                <h2>Запоминание</h2>
                <div className={style.wrapper}>
                    <div className={style.counter}>
                        <Counter current={currentCardNumber} total={totalCards} />
                    </div>

                    <div className={style.mainButtons}>
                        <EditButton card={currentCard} updateCard={this.props.updateCard} />
                        <NextButton onClick={this.goNext} />
                        <DeleteButton />
                    </div>

                    <div className={style.otherButtons}>
                        <div className={style.playPauseButtons}>
                            <PlayButton onClick={this.togglePlayMode} disabled={isAutoPlayMode} />
                            <PauseButton onClick={this.togglePlayMode} disabled={!isAutoPlayMode} />
                        </div>

                        <div className={style.doneButton}>
                            <DoneButton onClick={this.rememberCard} />
                        </div>

                        <div className={style.label}>
                            <Label value={label} onChange={this.props.updateLabel} />
                        </div>
                    </div>

                    {totalCards === 0
                        ? <div className={style.noCardsMessage}>No cards to show</div>
                        : <div className={style.panelWrapper}>
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
                          </div>}

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
        nextSounds: getNextRememberCardSounds(state),
        nextStepDelay: getNextStepDelay(state),
        firstWord: getRememberFirstWord(state),
        secondWord: getRememberSecondWord(state),
        ..._pick(state.card.remember.params, ['isAutoPlayMode', 'label']),
    }
}

export default connect(mapStateToProps, {
    setRememberCards,
    goNext: goNextRememberCard,
    rememberCard,
    updateCard,
    togglePlayMode: toggleRememberPlayMode,
    toggleSound: toggleRememberSound,
    switchOrder: switchRememberOrder,
    updateLabel: updateRememberLabel,
})(Component)
