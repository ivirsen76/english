import React from 'react'
import PropTypes from 'prop-types'
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

export default class Component extends React.Component {
    static propTypes = {
        totalCards: PropTypes.number,
        currentCardIndex: PropTypes.number,
        currentCard: PropTypes.object,
        step: PropTypes.number,
        enLanguage: PropTypes.string,
        isTextFirst: PropTypes.bool,
        isPlayMode: PropTypes.bool,
        isEnSound: PropTypes.bool,
        isRuSound: PropTypes.bool,
        label: PropTypes.string,
        setCardsToRemember: PropTypes.func,
        updateParams: PropTypes.func,
        rememberWord: PropTypes.func,
        goToNextCard: PropTypes.func,
        switchOrder: PropTypes.func,
        togglePlayMode: PropTypes.func,
        toggleSound: PropTypes.func,
        updateCard: PropTypes.func,
    }

    static defaultProps = {
        totalCards: 123,
        currentCardIndex: 13,
        currentCard: {
            text: 'Something',
            translate: 'Что-то такое',
            textSoundFile: '',
            translateSoundFile: '',
        },
        step: 2,
        enLanguage: 'us',
        isTextFirst: true,
        isPlayMode: false,
        isEnSound: false,
        isRuSound: false,
        label: 'lesson',
        setCardsToRemember() {},
        updateParams() {},
        rememberWord() {},
        goToNextCard() {},
        switchOrder() {},
        togglePlayMode() {},
        toggleSound() {},
        updateCard() {},
    }

    componentDidMount() {
        this.props.setCardsToRemember()
    }

    getFirstWord = () => ({
        word: this.props.currentCard.text,
        language: 'us',
        isSound: false,
        toggleSound() {},
    })

    getSecondWord = () => ({
        word: this.props.currentCard.translate,
        language: 'ru',
        isSound: false,
        toggleSound() {},
    })

    render() {
        const {
            isTextFirst,
            currentCard,
            currentCardIndex,
            totalCards,
            updateCard,
            goToNextCard,
            step,
            isPlayMode,
            switchOrder,
            rememberWord,
            togglePlayMode,
            label,
        } = this.props

        let firstWord = isTextFirst ? this.getFirstWord() : this.getSecondWord()
        let secondWord = isTextFirst ? this.getSecondWord() : this.getFirstWord()

        return (
            <div>
                <h2>Запоминание</h2>
                <div className={style.wrapper}>
                    <div className={style.counter}>
                        <Counter current={currentCardIndex} total={totalCards} />
                    </div>

                    <div className={style.mainButtons}>
                        <EditButton card={currentCard} onSuccess={updateCard} />
                        <NextButton onClick={goToNextCard} />
                        <DeleteButton />
                    </div>

                    <div className={style.otherButtons}>
                        <div className={style.playPauseButtons}>
                            <PlayButton onClick={togglePlayMode} disabled={isPlayMode} />
                            <PauseButton onClick={togglePlayMode} disabled={!isPlayMode} />
                        </div>

                        <div className={style.doneButton}>
                            <DoneButton onClick={rememberWord} />
                        </div>

                        <div className={style.label}>
                            <Label value={label} />
                        </div>
                    </div>

                    <div className={style.panelWrapper}>
                        <SwitchButton onClick={switchOrder} />
                        <Panel
                            word={firstWord.word}
                            language={firstWord.language}
                            isSound={firstWord.isSound}
                            soundFile={firstWord.soundFile}
                            toggleSound={this.toggleSound}
                        />
                        <Panel
                            word={secondWord.word}
                            language={secondWord.language}
                            isSound={secondWord.isSound}
                            soundFile={secondWord.soundFile}
                            show={step === 2}
                            iconPosition="top"
                            toggleSound={this.toggleSound}
                        />
                    </div>

                    <GoNextPanel onClick={goToNextCard} />
                </div>
            </div>
        )
    }
}
