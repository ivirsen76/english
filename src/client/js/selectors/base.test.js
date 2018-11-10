import {
    getTree,
    getSortedList,
    getNewIds,
    getUpdatedIds,
    getRemovedIds,
    getHasTreeChanges,
    getProtectedIds,
    getSavingList,
    getWords,
} from './base'

describe('getSortedList()', () => {
    it('Should return sorted list', () => {
        const state = {
            list: [
                { id: 1, position: 3 },
                { id: 2, position: 2 },
                { id: 3, position: 1 },
                { id: 4, position: 4 },
            ],
        }
        const expectedResult = [
            { id: 3, position: 1 },
            { id: 2, position: 2 },
            { id: 1, position: 3 },
            { id: 4, position: 4 },
        ]

        expect(getSortedList(state)).toEqual(expectedResult)
    })
})

describe('getTree()', () => {
    it('Should return list as a tree', () => {
        const state = {
            list: [
                { id: 4, parentId: 0, position: 0, title: 'Учебники', type: 'folder' },
                { id: 5, parentId: 0, position: 1, title: 'Dialogs', type: 'folder' },
                { id: 1, parentId: 4, position: 0, title: 'face2face', type: 'folder' },
                { id: 2, parentId: 1, position: 1, title: 'Chapter 2', type: 'cards' },
                { id: 3, parentId: 1, position: 0, title: 'Chapter 1', type: 'cards' },
            ],
        }
        const expectedResult = {
            id: 0,
            children: [
                {
                    id: 4,
                    title: 'Учебники',
                    type: 'folder',
                    isAdult: true,
                    children: [
                        {
                            id: 1,
                            title: 'face2face',
                            type: 'folder',
                            isAdult: true,
                            children: [
                                { id: 3, title: 'Chapter 1', type: 'cards' },
                                { id: 2, title: 'Chapter 2', type: 'cards' },
                            ],
                        },
                    ],
                },
                {
                    id: 5,
                    title: 'Dialogs',
                    type: 'folder',
                    isAdult: true,
                    children: [],
                },
            ],
        }

        expect(getTree(state)).toEqual(expectedResult)
    })
})

describe('getNewIds()', () => {
    it('Should return new Ids', () => {
        const state = {
            list: [{ id: 1 }, { id: 2 }, { id: 1000000000 }, { id: 2 }, { id: 1000000001 }],
            savedList: [],
        }
        expect(getNewIds(state)).toEqual([1000000000, 1000000001])
        expect(getHasTreeChanges(state)).toBe(true)
    })
})

describe('getUpdatedIds()', () => {
    it('Should return updated ids', () => {
        const state = {
            list: [
                { id: 1, parentId: 0, position: 0 },
                { id: 2, parentId: 0, position: 1 },
                { id: 1000000000, parentId: 2, position: 0 },
            ],
            savedList: [
                { id: 1, parentId: 0, position: 0 },
                { id: 2, parentId: 1, position: 0 },
                { id: 1000000001, parentId: 1, position: 1 },
            ],
        }
        expect(getUpdatedIds(state)).toEqual([2])
        expect(getHasTreeChanges(state)).toBe(true)
    })
})

describe('getRemovedIds()', () => {
    it('Should return removed ids', () => {
        const state = {
            list: [{ id: 1 }, { id: 3 }],
            savedList: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        }
        expect(getRemovedIds(state)).toEqual([2, 4])
        expect(getHasTreeChanges(state)).toBe(true)
    })
})

describe('getHasTreeChanges()', () => {
    it('Should return false', () => {
        const state = {
            list: [{ id: 1, parentId: 0 }, { id: 2, parentId: 0 }],
            savedList: [{ id: 1, parentId: 0 }, { id: 2, parentId: 0 }],
        }
        expect(getHasTreeChanges(state)).toBe(false)
    })
})

describe('getProtectedIds()', () => {
    it('Should return protected ids', () => {
        const state = {
            list: [
                { id: 1, parentId: 0 },
                { id: 2, parentId: 1, count: 1 },
                { id: 3, parentId: 1 },
            ],
        }
        expect(getProtectedIds(state)).toEqual([1, 2])
    })
})

describe('getSavingList()', () => {
    it('Should add default price and info', () => {
        const state = {
            list: [
                { id: 1, price: null, info: null },
                { id: 2 },
                { id: 3, price: 10, info: 'some' },
            ],
        }
        const expectedList = [
            { id: 1, price: 0, info: '' },
            { id: 2, price: 0, info: '' },
            { id: 3, price: 10, info: 'some' },
        ]
        expect(getSavingList(state)).toEqual(expectedList)
    })
})

describe('getWords', () => {
    it('Should return words', () => {
        const state = {
            cards: [
                { id: 1, text: 'Some-Stuff (figure)' },
                { id: 2, text: 'Another than' },
                { id: 3, text: 'More, than usual!' },
            ],
        }
        const expectedResult = ['some-stuff', 'another', 'than', 'more', 'usual']
        expect(getWords(state)).toEqual(expectedResult)
    })
})
