import React from 'react'
import PropTypes from 'prop-types'
import adjectives from 'client/js/json/adjectives.json'
import inSentence from 'client/js/json/inSentence.json'
import { connect } from 'react-redux'
import { getWords } from 'client/js/selectors/base.js'
import style from './style.module.css'

class WordHelper extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        existingWords: PropTypes.array,
    }

    getWords = () => {
        const getBaseWord = word => word[1]
        const isInSentence = word => inSentence.includes(word[0])
        const isAdjective = word => adjectives.includes(word[0])
        const isOther = word => word[0] && !isInSentence(word) && !isAdjective(word)

        const words = this.props.base.words
            .split(',')
            .map(item => [item.trim().toLowerCase(), item.trim()])
            .filter(item => !this.props.existingWords.includes(item[0]))

        const result = {}
        result.inSentence = words.filter(isInSentence).map(getBaseWord)
        result.adjectives = words.filter(isAdjective).map(getBaseWord)
        result.others = words.filter(isOther).map(getBaseWord)

        return result
    }

    renderWord = word => (
        <div key={word} className={`ui label ${style.word}`}>
            {word}
        </div>
    )

    render() {
        const words = this.getWords()

        return (
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
                        <td id="inSentenceWords">{words.inSentence.map(this.renderWord)}</td>
                        <td id="adjectiveWords">{words.adjectives.map(this.renderWord)}</td>
                        <td id="otherWords">{words.others.map(this.renderWord)}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state, props) => ({
    existingWords: getWords(state.app.base),
})

export default connect(mapStateToProps)(WordHelper)
