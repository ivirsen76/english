import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getWriteCurrentCard, getNextWriteCardSounds } from 'client/js/selectors/card'
import {
    setWriteCards,
    goNextWriteCard,
    updateWriteInput,
    checkWriting,
} from 'client/js/reducers/card'
import mp3 from 'client/js/utils/mp3.js'
import { getMediaUrl } from 'client/js/utils/media.js'
import Counter from 'client/js/pages/Remember/Counter'
import InputField from './InputField'
import DiffResult from './DiffResult'
import NextButton from './NextButton'
import { removeMeta, isTextEqual } from 'client/js/utils/text.js'
import style from './index.module.scss'
import IconPlay from '@ieremeev/icons/play4'

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
            this.props.nextSounds.map(soundFile => mp3.preload(getMediaUrl(soundFile)))
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
        const currentCard = this.props.currentCard
        e && e.preventDefault()

        mp3.play(getMediaUrl(currentCard.usSoundFile))
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

        return (
            <div>
                <h2>Write</h2>
                <div className={style.wrapper}>
                    <div className={style.counter}>
                        <Counter current={currentCardNumber} total={totalCards} />
                    </div>
                    <div className={style.buttonWrapper}>
                        <NextButton goNext={this.goNext} />
                        <button className="huge circular ui icon button" onClick={this.playSound}>
                            <IconPlay />
                        </button>
                    </div>
                    {!isChecked ? (
                        <div>
                            <InputField
                                value={input}
                                onChange={this.props.updateWriteInput}
                                height={this.state.height}
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
                                    (isTextEqual(currentCard.text, input)
                                        ? style.positive
                                        : style.negative)
                                }
                                id="result"
                            >
                                <DiffResult str1={input} str2={removeMeta(currentCard.text)} />
                            </div>
                            <div className={style.resultBlock}>
                                <div className={style.text} id="rightText">
                                    <DiffResult
                                        str1={removeMeta(currentCard.text)}
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

export default connect(mapStateToProps, {
    setWriteCards,
    goNextWriteCard,
    updateWriteInput,
    checkWriting,
})(Component)
