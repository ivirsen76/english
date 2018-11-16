import { createSelector } from 'reselect'
import { stripBrackets } from 'server/utils.js'

const getBasecards = state => state.app.base.cards
const getCards = state => state.app.card.list

export const getBaseCardsToAdd = createSelector(getBasecards, getCards, (basecards, cards) => {
    if (cards.length === 0) {
        return basecards.map(item => item.id)
    }

    const simplify = string =>
        stripBrackets(string)
            .toLowerCase()
            .replace(/\./gi, '')
            .trim()

    const cardsTexts = cards.map(item => simplify(item.text))
    const basecardIds = cards.filter(item => item.basecardId).map(item => item.basecardId)

    const result = basecards
        .filter(item => !basecardIds.includes(item.id) && !cardsTexts.includes(simplify(item.text)))
        .map(item => item.id)

    return result
})
