import reducer, {
    initialState,
    deleteBase,
    updateBase,
    updateSavedBase,
    addCardWithoutSaving as addCard,
    deleteCardWithoutSaving as deleteCard,
    updateCardWithoutSaving as updateCard,
    setBases,
    setLoadingBasesState,
    cleanCards,
    setCardsForBase,
    moveElement,
    addElement,
    updateBaseIds,
    toggleShowBaseSettings,
    toggleShowWordHelper,
} from './base'

describe('setLoadingBasesState()', () => {
    it('Should set loading bases state', () => {
        const state = {
            ...initialState,
            loading: false,
        }
        expect(reducer(state, setLoadingBasesState(true)).loading).toBe(true)
    })
})

describe('deleteBase()', () => {
    it('Should delete base and remove it from remember list', () => {
        const state = {
            ...initialState,
            list: [{ id: 1, title: 'Tree1', price: 800 }, { id: 2, title: 'Tree2', price: 800 }],
        }
        const expectedList = [{ id: 2, title: 'Tree2', price: 800 }]
        const resultedState = reducer(state, deleteBase(1))
        expect(resultedState.list).toEqual(expectedList)
    })
})

describe('updateBase()', () => {
    it('Should update base', () => {
        const state = {
            ...initialState,
            list: [{ id: 2, title: 'Tree2', price: 800 }],
        }
        const expectedList = [{ id: 2, title: 'TreeUpdated', price: 800 }]
        const resultedState = reducer(state, updateBase({ id: 2, title: 'TreeUpdated' }))
        expect(resultedState.list).toEqual(expectedList)
    })
})

describe('updateSavedBase()', () => {
    it('Should update saved base', () => {
        const state = {
            ...initialState,
            savedList: [{ id: 2, title: 'Tree2', price: 800 }],
        }
        const expectedList = [{ id: 2, title: 'TreeUpdated', price: 800 }]
        const resultedState = reducer(state, updateSavedBase({ id: 2, title: 'TreeUpdated' }))
        expect(resultedState.savedList).toEqual(expectedList)
    })
})

describe('setBases()', () => {
    it('Should add bases', () => {
        const state = {
            ...initialState,
            list: [{ id: 2, title: 'Tree2', price: 800 }],
            savedList: [{ some: 'one' }],
        }
        const expectedList = [
            { id: 3, title: 'Tree2', price: 800 },
            { id: 4, title: 'Tree2', price: 800 },
        ]
        const resultedState = reducer(state, setBases(expectedList))
        expect(resultedState.list).toEqual(expectedList)
        expect(resultedState.savedList).toEqual(expectedList)
    })
})

describe('addCard()', () => {
    it('Should add card to base and update counts', () => {
        const oldCard = { id: 4, baseId: 3, text: 'More', translate: 'Anymore' }
        const newCard = { id: 5, baseId: 4, text: 'Some', translate: 'Another' }
        const state = {
            ...initialState,
            list: [
                { id: 2, parentId: 0, count: 1 },
                { id: 3, parentId: 2, count: 1 },
                { id: 4, parentId: 2, count: 0 },
            ],
            cards: [oldCard],
        }
        const expectedList = [
            { id: 2, parentId: 0, count: 2 },
            { id: 3, parentId: 2, count: 1 },
            { id: 4, parentId: 2, count: 1 },
        ]

        const resultedState = reducer(state, addCard(newCard))
        expect(resultedState.cards).toEqual([oldCard, newCard])
        expect(resultedState.list).toEqual(expectedList)
    })
})

describe('deleteCard()', () => {
    it('Should delete card', () => {
        const state = {
            ...initialState,
            cards: [{ id: 1, text: 'Tree1' }, { id: 2, text: 'Tree2' }],
        }
        const expectedCards = [{ id: 2, text: 'Tree2' }]
        const resultedState = reducer(state, deleteCard(1))
        expect(resultedState.cards).toEqual(expectedCards)
    })
})

describe('updateCard()', () => {
    it('Should update card', () => {
        const state = {
            ...initialState,
            cards: [
                { id: 3, text: 'One', translate: 'Another', baseId: 2 },
                { id: 4, text: 'More', translate: 'Anymore', baseId: 2 },
            ],
        }
        const expectedCards = [
            { id: 3, text: 'One', translate: 'Another', baseId: 2 },
            { id: 4, text: 'Some', translate: 'Moreover', baseId: 2 },
        ]

        const resultedState = reducer(
            state,
            updateCard({ id: 4, text: 'Some', translate: 'Moreover' })
        )
        expect(resultedState.cards).toEqual(expectedCards)
    })
})

describe('setCardsForBase()', () => {
    it('Should set cards for base', () => {
        const state = {
            ...initialState,
            cards: [{ id: 5, baseId: 2, text: 'Old', translate: 'ReallyOld' }],
        }
        const cards = [
            { id: 3, text: 'One', translate: 'Another' },
            { id: 4, text: 'More', translate: 'Anymore' },
        ]
        const expectedCards = [
            { id: 3, text: 'One', translate: 'Another', baseId: 2 },
            { id: 4, text: 'More', translate: 'Anymore', baseId: 2 },
        ]

        const resultedState = reducer(state, setCardsForBase({ baseId: 2, cards }))
        expect(resultedState.cards).toEqual(expectedCards)
    })
})

describe('moveElement()', () => {
    const state = {
        list: [
            { id: 1, parentId: 0, position: 0 },
            { id: 2, parentId: 1, position: 0 },
            { id: 3, parentId: 1, position: 1 },
            { id: 4, parentId: 0, position: 1 },
            { id: 5, parentId: 4, position: 0 },
            { id: 6, parentId: 4, position: 1 },
        ],
    }

    it('Should move element in the same subtree', () => {
        const expectedState = {
            list: [
                { id: 1, parentId: 0, position: 0 },
                { id: 2, parentId: 1, position: 1 },
                { id: 3, parentId: 1, position: 0 },
                { id: 4, parentId: 0, position: 1 },
                { id: 5, parentId: 4, position: 0 },
                { id: 6, parentId: 4, position: 1 },
            ],
        }
        const resultedState = reducer(
            state,
            moveElement({
                id: 3,
                parentId: 1,
                beforeId: 2,
            })
        )
        expect(resultedState).toEqual(expectedState)
    })

    it('Should move element to the different subtree', () => {
        const expectedState = {
            list: [
                { id: 1, parentId: 0, position: 0 },
                { id: 2, parentId: 1, position: 0 },
                { id: 3, parentId: 1, position: 2 },
                { id: 4, parentId: 0, position: 1 },
                { id: 5, parentId: 1, position: 1 },
                { id: 6, parentId: 4, position: 0 },
            ],
        }
        const resultedState = reducer(
            state,
            moveElement({
                id: 5,
                parentId: 1,
                beforeId: 3,
            })
        )
        expect(resultedState).toEqual(expectedState)
    })

    it('Should move element to the end of the list', () => {
        const expectedState = {
            list: [
                { id: 1, parentId: 0, position: 0 },
                { id: 2, parentId: 4, position: 2 },
                { id: 3, parentId: 1, position: 0 },
                { id: 4, parentId: 0, position: 1 },
                { id: 5, parentId: 4, position: 0 },
                { id: 6, parentId: 4, position: 1 },
            ],
        }
        const resultedState = reducer(
            state,
            moveElement({
                id: 2,
                parentId: 4,
            })
        )
        expect(resultedState).toEqual(expectedState)
    })

    it('Should change two elements together', () => {
        const expectedState = {
            list: [
                { id: 1, parentId: 0, position: 0 },
                { id: 2, parentId: 1, position: 0 },
                { id: 3, parentId: 1, position: 1 },
                { id: 4, parentId: 0, position: 1 },
                { id: 5, parentId: 4, position: 1 },
                { id: 6, parentId: 4, position: 0 },
            ],
        }
        const resultedState = reducer(
            state,
            moveElement({
                id: 5,
                parentId: 4,
                beforeId: 0,
            })
        )
        expect(resultedState).toEqual(expectedState)
    })

    it('Should move the first element', () => {
        const state1 = {
            list: [
                { id: 1, parentId: 0, position: 0 },
                { id: 2, parentId: 0, position: 1 },
                { id: 3, parentId: 0, position: 2 },
            ],
        }
        const expectedState = {
            list: [
                { id: 1, parentId: 0, position: 1 },
                { id: 2, parentId: 0, position: 0 },
                { id: 3, parentId: 0, position: 2 },
            ],
        }
        const resultedState = reducer(
            state1,
            moveElement({
                id: 1,
                parentId: 0,
                beforeId: 3,
            })
        )
        expect(resultedState).toEqual(expectedState)
    })
})

describe('addElement()', () => {
    const state = {
        list: [
            { id: 1, parentId: 0, position: 0 },
            { id: 2, parentId: 1, position: 0 },
            { id: 3, parentId: 1, position: 1 },
        ],
        newId: 1000000000,
    }

    it('Should move element in the same subtree', () => {
        const expectedState = {
            list: [
                { id: 1, parentId: 0, position: 0 },
                { id: 2, parentId: 1, position: 0 },
                { id: 3, parentId: 1, position: 2 },
                {
                    id: 1000000000,
                    parentId: 1,
                    position: 1,
                    type: 'folder',
                    arrangeChildren: 'list',
                    info: '',
                    price: 0,
                    label: '',
                },
            ],
            newId: 1000000001,
        }
        const resultedState = reducer(
            state,
            addElement({
                element: { type: 'folder' },
                parentId: 1,
                beforeId: 3,
            })
        )
        expect(resultedState).toEqual(expectedState)
    })
})

describe('updateBaseIds()', () => {
    it('Should return at least updated savedList if there is no ids', () => {
        const state = {
            list: [{ id: 1, parentId: 0 }, { id: 2, parentId: 1 }, { id: 3, parentId: 1 }],
        }
        const resultedState = reducer(state, updateBaseIds({}))
        expect(resultedState.list).toBe(state.list)
        expect(resultedState.savedList).toBe(state.list)
    })

    it('Should update base ids', () => {
        const state = {
            list: [
                { id: 100, parentId: 0 },
                { id: 101, parentId: 100 },
                { id: 102, parentId: 100 },
            ],
            savedList: [],
        }
        const expectedList = [
            { id: 1, parentId: 0 },
            { id: 2, parentId: 1 },
            { id: 3, parentId: 1 },
        ]
        const resultedState = reducer(state, updateBaseIds({ 100: 1, 101: 2, 102: 3 }))
        expect(resultedState.list).toEqual(expectedList)
        expect(resultedState.savedList).toEqual(expectedList)
    })
})

describe('toggleShowBaseSettings()', () => {
    it('Should toggle showBaseSettings', () => {
        const state = {
            showBaseSettings: true,
        }
        const resultedState = reducer(state, toggleShowBaseSettings())
        expect(resultedState.showBaseSettings).toBe(false)
    })
})

describe('toggleShowWordHelper()', () => {
    it('Should toggle show word helper to false', () => {
        const state = {
            showWordHelper: true,
        }
        expect(reducer(state, toggleShowWordHelper()).showWordHelper).toBe(false)
    })

    it('Should toggle show word helper to true', () => {
        const state = {
            showWordHelper: false,
        }
        expect(reducer(state, toggleShowWordHelper()).showWordHelper).toBe(true)
    })
})

describe('cleanCards()', () => {
    const state = {
        ...initialState,
        cards: [{ id: 5, baseId: 2, text: 'Old', translate: 'ReallyOld' }],
    }
    expect(reducer(state, cleanCards()).cards).toEqual([])
})
