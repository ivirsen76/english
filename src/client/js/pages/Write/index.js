import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import globalClickRequired from 'client/js/helpers/globalClickRequired'
import { getWriteCurrentCard, getNextWriteCardSounds } from 'client/js/selectors/card'
import {
    setWriteCards,
    goNextWriteCard,
    updateWriteInput,
    checkWriting,
} from 'client/js/reducers/card'
import { preload, play } from 'client/js/utils/mp3.js'
import { getMediaUrl } from 'client/js/utils/media.js'
import Counter from 'client/js/pages/Remember/Counter'
import { removeMeta, isTextEqual } from 'client/js/utils/text.js'
import IconPlay from '@ieremeev/icons/play4'
import { stripBrackets } from 'server/utils.js'
import DiffResult from './DiffResult'
import NextButton from './NextButton'
import style from './index.module.scss'

class Component extends React.Component {
    static propTypes = {
        setWriteCards: PropTypes.func,
        goNextWriteCard: PropTypes.func,
        updateWriteInput: PropTypes.func,
        checkWriting: PropTypes.func,
        currentCardNumber: PropTypes.number,
        totalCards: PropTypes.number,
        nextSounds: PropTypes.array,
        currentCard: PropTypes.object,
        isChecked: PropTypes.bool,
        input: PropTypes.string,
        iteration: PropTypes.number,
    }

    state = {
        height: null,
    }

    inputRef = null

    componentWillMount() {
        document.addEventListener('keydown', this.handleEnterKey)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEnterKey)
    }

    componentDidMount() {
        this.adjustHeight()
        this.props.setWriteCards()
    }

    componentDidUpdate(prevProps) {
        this.adjustHeight()

        if (
            prevProps.currentCard.text !== this.props.currentCard.text ||
            prevProps.iteration !== this.props.iteration
        ) {
            this.playSound()
        }

        if (process.env.NODE_ENV !== 'test') {
            // Preload mp3 for the next card
            this.props.nextSounds.map(soundFile => preload(getMediaUrl(soundFile)))
        }
    }

    handleEnterKey = e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            this.goNext()
        }
    }

    adjustHeight = () => {
        if (!this.heightMeter) {
            return
        }

        const height = this.heightMeter.offsetHeight
        if (height !== this.state.height) {
            this.setState({ height })
        }
    }

    playSound = e => {
        e && e.preventDefault()
        const currentCard = this.props.currentCard

        if (currentCard.usSoundFile) {
            play(getMediaUrl(currentCard.usSoundFile))
        }

        if (this.inputRef) {
            this.inputRef.focus()
        }
    }

    goNext = e => {
        e && e.preventDefault()

        if (!this.props.input) {
            return
        }

        if (this.props.isChecked) {
            this.props.goNextWriteCard()
        } else {
            this.props.checkWriting()
        }
    }

    render() {
        const { currentCard, input, currentCardNumber, totalCards, isChecked } = this.props

        // Strip text in brackets
        const text = currentCard.text && stripBrackets(currentCard.text)

        return (
            <div>
                <h2>Write</h2>
                {totalCards === 0 ? (
                    <div className="ui warning message">Слов для написания нет</div>
                ) : (
                    <div className={style.wrapper}>
                        <div className={style.counter}>
                            <Counter current={currentCardNumber} total={totalCards} />
                        </div>
                        <div className={style.buttonWrapper}>
                            <NextButton goNext={this.goNext} />
                            <button
                                type="button"
                                className="huge circular ui icon button"
                                onClick={this.playSound}
                            >
                                <IconPlay />
                            </button>
                        </div>
                        {!isChecked ? (
                            <div>
                                <textarea
                                    ref={e => {
                                        this.inputRef = e
                                    }}
                                    type="text"
                                    className={style.input}
                                    value={input}
                                    onChange={e => this.props.updateWriteInput(e.target.value)}
                                    style={{ height: this.state.height }}
                                    autoFocus
                                    spellCheck={false}
                                />
                                <div style={{ height: 0, overflow: 'hidden' }}>
                                    <div
                                        className={style.input}
                                        ref={div => {
                                            this.heightMeter = div
                                        }}
                                    >
                                        {input || '1'}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div
                                    className={
                                        style.input +
                                        ' ' +
                                        (isTextEqual(text, input) ? style.positive : style.negative)
                                    }
                                    id="result"
                                >
                                    <DiffResult str1={input} str2={removeMeta(text)} />
                                </div>
                                <div className={style.resultBlock}>
                                    <div className={style.text} id="rightText">
                                        <DiffResult
                                            str1={removeMeta(text)}
                                            str2={input}
                                            diffStyle="added"
                                        />
                                    </div>
                                    <div className={style.translate} id="translate">
                                        {removeMeta(currentCard.translate)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalCards: state.app.card.write.list.length,
        currentCardNumber: state.app.card.write.currentCardIndex + 1,
        currentCard: getWriteCurrentCard(state.app.card),
        enLanguage: 'us',
        nextSounds: getNextWriteCardSounds(state.app.card),
        isChecked: state.app.card.write.isChecked,
        input: state.app.card.write.input,
        iteration: state.app.card.write.iteration,
    }
}

export default globalClickRequired(
    connect(mapStateToProps, {
        setWriteCards,
        goNextWriteCard,
        updateWriteInput,
        checkWriting,
    })(Component)
)
