import { createSelector } from 'reselect'
import { minNewId } from 'reducers/card'
import _max from 'lodash/max'
import _maxBy from 'lodash/maxBy'

const getList = state => state.card.list
const getListToRemember = state => state.card.remember.list

export const getNextNewId = createSelector(getList, list => _max([...list.map(item => item.id + 1), minNewId]))

export const getLatestLabel = createSelector(getList, list => {
    const latest = _maxBy(list, item => item.id)
    return latest && latest.label ? latest.label : ''
})

export const getCardCount = createSelector(getList, list => list.length)

export const getListForRemember = createSelector(getList, list => list.filter(item => item.status === 0))

export const getTotalCardsToRemember = createSelector(getListToRemember, list => list.length)
