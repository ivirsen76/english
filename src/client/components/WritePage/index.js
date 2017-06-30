import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getWriteCurrentCard, getNextWriteCardSounds } from 'selectors/card'
import { setWriteCards, goNextWriteCard, updateWriteInput, checkWriting } from 'reducers/card'
import mp3 from 'utils/mp3.js'
import Counter from '../RememberPage/Counter'
import InputField from './InputField'
import DiffResult from './DiffResult'
import NextButton from './NextButton'
import { isTextEqual } from 'utils/text.js'
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

        mp3.play(process.env.REACT_APP_AWS_S3_PUBLIC_URL + 'sounds/' + currentCard.usSoundFile)
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
                <h2>Написание</h2>
                <div className={style.wrapper}>
                    <div className={style.counter}>
                        <Counter current={currentCardNumber} total={totalCards} />
                    </div>
                    <div className={style.buttonWrapper}>
                        <NextButton goNext={this.goNext} />
                        <button className="huge circular ui icon button" onClick={this.playSound}>
                            <i className="icon-play3" />
                        </button>
                    </div>
                    {!isChecked
                        ? <div>
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
                        : <div>
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
                                  <DiffResult str1={input} str2={currentCard.text} />
                              </div>
                              <div className={style.resultBlock}>
                                  <div className={style.text} id="rightText">
                                      <DiffResult
                                          str1={currentCard.text}
                                          str2={input}
                                          diffStyle="added"
                                      />
                                  </div>
                                  <div className={style.translate} id="translate">
                                      {currentCard.translate}
                                  </div>
                              </div>
                          </div>}
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
        isChecked: state.card.write.isChecked,
        input: state.card.write.input,
    }
}

export default connect(mapStateToProps, {
    setWriteCards,
    goNextWriteCard,
    updateWriteInput,
    checkWriting,
})(Component)
