import { getUpdates } from './utils.js'

describe('getUpdates()', () => {
    const originalList = [
        { id: 1, parentId: 0, position: 0, title: 'One' },
        { id: 2, parentId: 1, position: 0, title: 'Two' },
        { id: 3, parentId: 1, position: 1, title: 'Three' },
    ]
    const getResult = getUpdates.bind(null, originalList)

    it('Should return empty result', () => {
        expect(getResult(originalList)).toEqual([])
    })

    it('Should return updated position', () => {
        const list = [
            { id: 1, parentId: 0, position: 0 },
            { id: 2, parentId: 1, position: 1 },
            { id: 3, parentId: 1, position: 0 },
        ]
        const expectedResult = [
            { query: 'update', id: 2, position: 1 },
            { query: 'update', id: 3, position: 0 },
        ]

        expect(getResult(list)).toEqual(expectedResult)
    })

    it('Should return updated title', () => {
        const list = [
            { id: 1, parentId: 0, position: 0, title: 'Another' },
            { id: 2, parentId: 1, position: 0 },
            { id: 3, parentId: 1, position: 1 },
        ]
        const expectedResult = [{ query: 'update', id: 1, title: 'Another' }]

        expect(getResult(list)).toEqual(expectedResult)
    })

    it('Should return deleted rows', () => {
        const list = [{ id: 1, parentId: 0, position: 0 }, { id: 3, parentId: 1, position: 0 }]
        const expectedResult = [{ query: 'update', id: 3, position: 0 }, { query: 'delete', id: 2 }]

        expect(getResult(list)).toEqual(expectedResult)
    })

    it('Should return empty result for list with wrong keys', () => {
        const list = [
            { id: 1, parentId: 0, position: 0, some: 'one' },
            { id: 2, parentId: 1, position: 0 },
            { id: 3, parentId: 1, position: 1 },
        ]

        expect(getResult(list)).toEqual([])
    })
})
