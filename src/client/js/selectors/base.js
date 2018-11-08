import { createSelector } from 'reselect'
import _omit from 'lodash/omit'
import _isEqual from 'lodash/isEqual'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import { startNewId } from '../reducers/base.js'

const getList = state => state.list
const getSavedList = state => state.savedList
const getCards = state => state.cards

export const getSortedList = createSelector(getList, list =>
    list.sort((a, b) => a.position - b.position)
)

export const getTree = createSelector(getSortedList, list => {
    const getChildren = parentId =>
        list.filter(item => item.parentId === parentId).map(item => {
            const child = _omit(item, ['parentId', 'position'])
            if (child.type === 'folder') {
                child.isAdult = true
                child.children = getChildren(child.id)
            }

            return child
        })

    return {
        id: 0,
        children: getChildren(0),
    }
})

export const getNewIds = createSelector(getList, list =>
    list.filter(item => item.id >= startNewId).map(item => item.id)
)

export const getUpdatedIds = createSelector(
    getList,
    getSavedList,
    getNewIds,
    (list, savedList, newIds) =>
        list
            .filter(item => {
                if (newIds.includes(item.id)) {
                    return false
                }

                const prevItem = savedList.find(obj => obj.id === item.id)
                if (!_isEqual(item, prevItem)) {
                    return true
                }

                return false
            })
            .map(item => item.id)
)

export const getRemovedIds = createSelector(getList, getSavedList, (list, savedList) => {
    const ids = list.map(item => item.id)
    return savedList.filter(item => !ids.includes(item.id)).map(item => item.id)
})

export const getHasTreeChanges = createSelector(
    getNewIds,
    getUpdatedIds,
    getRemovedIds,
    (newIds, updatedIds, removedIds) => newIds.length + updatedIds.length + removedIds.length > 0
)

export const getProtectedIds = createSelector(getList, list => {
    const parents = list.filter(item => item.parentId !== 0).map(item => item.parentId)
    const withCards = list.filter(item => +item.count > 0).map(item => item.id)

    return _uniq([...parents, ...withCards])
})

export const getSavingList = createSelector(getList, list =>
    list.map(item => ({ ...item, price: item.price || 0, info: item.info || '' }))
)

export const getWords = createSelector(getCards, cards => {
    let result = cards.map(item =>
        item.text
            .toLowerCase()
            .replace(/\([^)]*\)/g, '')
            .replace(/[.,\-!?;:'"]/g, '')
            .split(' ')
    )

    result = _uniq(_flatten(result)).filter(item => item)

    return result
})
