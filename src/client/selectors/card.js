import { createSelector } from 'reselect'
import { minNewId } from 'reducers/card'
import _max from 'lodash/max'
import _maxBy from 'lodash/maxBy'
import _find from 'lodash/find'

const getList = state => state.card.list
const getRememberSortedList = state => state.card.remember.list
const getRememberCurrentCardIndex = state => state.card.remember.currentCardIndex

export const getRememberList = createSelector(getList, list =>
    list.filter(item => item.status === 0)
)

export const getNextNewId = createSelector(getList, list =>
    _max([...list.map(item => item.id + 1), minNewId])
)

export const getLatestLabel = createSelector(getList, list => {
    const latest = _maxBy(list, item => item.id)
    return latest && latest.label ? latest.label : ''
})

export const getCardTotal = createSelector(getList, list => list.length)

export const getRememberTotalCards = createSelector(getRememberList, list => list.length)

export const getRememberCurrentCard = createSelector(
    getList,
    getRememberSortedList,
    getRememberCurrentCardIndex,
    (list, rememberSortedList, index) => {
        const id = rememberSortedList[index] || 0
        return _find(list, { id }) || {}
    }
)

