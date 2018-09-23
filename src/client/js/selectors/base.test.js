import { getTree, getSortedList, getNewIds } from './base'

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
                { id: 4, parentId: 0, position: 0, title: 'Books', type: 'folder' },
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
                    title: 'Books',
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
            list: [{ id: 1 }, { id: 2 }, { id: 1001 }, { id: 2 }, { id: 1002 }],
            newId: 1000,
        }
        expect(getNewIds(state)).toEqual([1001, 1002])
    })
})
