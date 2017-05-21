import { createSelector } from 'reselect'
import { minNewId } from 'reducers/card'
import _max from 'lodash/max'
import _maxBy from 'lodash/maxBy'
import _find from 'lodash/find'

const getList = state => state.card.list
const getRememberList = state => state.card.remember.list
const getRememberCurrentCardIndex = state => state.card.remember.currentCardIndex

export const getNextNewId = createSelector(getList, list =>
    _max([...list.map(item => item.id + 1), minNewId])
)

export const getLatestLabel = createSelector(getList, list => {
    const latest = _maxBy(list, item => item.id)
    return latest && latest.label ? latest.label : ''
})

export const getCardCount = createSelector(getList, list => list.length)

export const getRememberTotalCards = createSelector(getRememberList, list => list.length)

export const getRememberCurrentCard = createSelector(
    getList,
    getRememberList,
    getRememberCurrentCardIndex,
    (list, rememberList, index) => {
        const id = rememberList[index] || 0
        return _find(list, { id }) || {}
    }
)
