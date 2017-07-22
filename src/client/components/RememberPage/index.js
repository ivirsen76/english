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
    resetRememberCards,
    goNextRememberStep,
    rememberCard,
    toggleRememberSound,
    toggleRememberPlayMode,
    switchRememberOrder,
    updateRememberLabel,
    updateCard,
    deleteCard,
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

class RememberPage extends React.Component {
    static propTypes = {
        totalCards: PropTypes.number,
        currentCardNumber: PropTypes.number,
        currentCard: PropTypes.object,
        firstWord: PropTypes.object,
        secondWord: PropTypes.object,
        step: PropTypes.number,
        iteration: PropTypes.number,
        isEditing: PropTypes.bool,
        // enLanguage: PropTypes.string,
        isAutoPlayMode: PropTypes.bool,
        label: PropTypes.string,
        setRememberCards: PropTypes.func,
        resetRememberCards: PropTypes.func,
        rememberCard: PropTypes.func,
        goNext: PropTypes.func,
        switchOrder: PropTypes.func,
        togglePlayMode: PropTypes.func,
        toggleSound: PropTypes.func,
        updateCard: PropTypes.func,
        deleteCard: PropTypes.func,
        updateLabel: PropTypes.func,
        nextSounds: PropTypes.array,
        nextStepDelay: PropTypes.number,
    }

    componentDidMount() {
        this.props.setRememberCards()
        document.addEventListener('keydown', this.handleSpaceKey)
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

    componentWillUnmount() {
        this.props.resetRememberCards()
        document.removeEventListener('keydown', this.handleSpaceKey)
    }

    handleSpaceKey = e => {
        if (this.props.isEditing) {
            return
        }

        if (e.keyCode === 32) {
            e.preventDefault()
            this.goNext()
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
            iteration,
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
                        <DeleteButton card={currentCard} deleteCard={this.props.deleteCard} />
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

                    {totalCards === 0 &&
                        <div className={style.noCardsMessage}>No cards to show</div>}
                    {totalCards !== 0 &&
                        currentCard.text &&
                        <div key={iteration} className={style.panelWrapper}>
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
        iteration: state.card.remember.iteration,
        isEditing: !!state.form.editCard,
        ..._pick(state.card.remember.params, ['isAutoPlayMode', 'label']),
    }
}

export default connect(mapStateToProps, {
    setRememberCards,
    resetRememberCards,
    goNext: goNextRememberStep,
    rememberCard,
    updateCard,
    deleteCard,
    togglePlayMode: toggleRememberPlayMode,
    toggleSound: toggleRememberSound,
    switchOrder: switchRememberOrder,
    updateLabel: updateRememberLabel,
})(RememberPage)
