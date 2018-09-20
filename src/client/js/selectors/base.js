import { createSelector } from 'reselect'
import _omit from 'lodash/omit'

const getList = state => state.list

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
