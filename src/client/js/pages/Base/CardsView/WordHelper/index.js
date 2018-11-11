import React from 'react'
import PropTypes from 'prop-types'
import HiddenBlock from '@ieremeev/hidden-block'
import adjectives from 'client/js/json/adjectives.json'
import inSentence from 'client/js/json/inSentence.json'
import { connect } from 'react-redux'
import { getWords } from 'client/js/selectors/base.js'
import { toggleShowWordHelper } from 'client/js/reducers/base.js'
import style from './style.module.css'

class WordHelper extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        existingWords: PropTypes.string,
        showWordHelper: PropTypes.bool,
        toggleShowWordHelper: PropTypes.func,
        onClick: PropTypes.func,
        idPrefix: PropTypes.string,
    }

    static defaultProps = {
        idPrefix: '',
        onClick: () => {},
    }

    getWords = () => {
        const getBaseWord = word => word[1]
        const isInSentence = word => inSentence.includes(word[0])
        const isAdjective = word => adjectives.includes(word[0])
        const isOther = word => word[0] && !isInSentence(word) && !isAdjective(word)

        const words = this.props.base.words
            .split(',')
            .map(item => [item.trim().toLowerCase(), item.trim()])
            .filter(item => !this.props.existingWords.includes(` ${item[0]} `))

        const result = {}
        result.inSentence = words.filter(isInSentence).map(getBaseWord)
        result.adjectives = words.filter(isAdjective).map(getBaseWord)
        result.others = words.filter(isOther).map(getBaseWord)

        return result
    }

    renderWord = word => (
        <div
            key={word}
            className={`ui label ${style.word}`}
            onClick={this.props.onClick.bind(null, word)}
        >
            {word}
        </div>
    )

    render() {
        const { idPrefix, showWordHelper } = this.props
        const words = this.getWords()

        return (
            <HiddenBlock
                title="Word helper"
                show={showWordHelper}
                handleClick={this.props.toggleShowWordHelper}
            >
                <table className="ui celled compact table">
                    <thead>
                        <tr>
                            <th>Use in sentence</th>
                            <th>Adjectives</th>
                            <th>Others</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id={`${idPrefix}inSentenceWords`}>
                                {words.inSentence.length > 0
                                    ? words.inSentence.map(this.renderWord)
                                    : '-'}
                            </td>
                            <td id={`${idPrefix}adjectiveWords`}>
                                {words.adjectives.length > 0
                                    ? words.adjectives.map(this.renderWord)
                                    : '-'}
                            </td>
                            <td id={`${idPrefix}otherWords`}>
                                {words.others.length > 0 ? words.others.map(this.renderWord) : '-'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HiddenBlock>
        )
    }
}

const mapStateToProps = (state, props) => ({
    showWordHelper: state.app.base.showWordHelper,
    existingWords: getWords(state.app.base),
})

export default connect(mapStateToProps, { toggleShowWordHelper })(WordHelper)
