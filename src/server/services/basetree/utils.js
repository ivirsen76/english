const _pick = require('lodash/pick')
const _isEmpty = require('lodash/isEmpty')
const _intersection = require('lodash/intersection')

const orderList = list => {
    const result = []

    const getChildren = parentId => {
        list
            .filter(item => item.parentId === parentId)
            .sort((a, b) => a.position - b.position)
            .forEach(item => {
                result.push(item)
                getChildren(item.id)
            })
    }
    getChildren(0)

    return result
}

const getUpdates = (originalList, list) => {
    list = orderList(list)

    const affectedKeys = [
        'id',
        'parentId',
        'position',
        'title',
        'type',
        'arrangeChildren',
        'isMain',
        'info',
        'words',
        'price',
        'label',
    ]
    const originalIds = originalList.map(item => item.id)
    const newIds = list.map(item => item.id)

    const updates = list
        .map(item => {
            if (!originalIds.includes(item.id)) {
                return { query: 'insert', ...item }
            }

            const keys = _intersection(Object.keys(item), affectedKeys)
            const originalItem = _pick(originalList.find(obj => obj.id === item.id), keys)
            const diff = keys.reduce((result, key) => {
                if (item[key] !== originalItem[key]) {
                    result[key] = item[key]
                }

                return result
            }, {})

            if (!_isEmpty(diff)) {
                return { query: 'update', id: item.id, ...diff }
            }

            return null
        })
        .filter(item => item)

    const removed = originalList
        .filter(item => !newIds.includes(item.id))
        .map(item => ({ query: 'delete', id: item.id }))

    return [...updates, ...removed]
}

module.exports.getUpdates = getUpdates
module.exports.orderList = orderList
