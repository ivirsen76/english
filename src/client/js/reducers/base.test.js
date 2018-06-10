import reducer, {
    initialState,
    addBaseWithoutSaving as addBase,
    deleteBaseWithoutSaving as deleteBase,
    updateBaseWithoutSaving as updateBase,
    addCardWithoutSaving as addCard,
    setBases,
    setLoadingBasesState,
} from './base'

describe('base reducer', () => {
    describe('setLoadingBasesState()', () => {
        it('Should set loading bases state', () => {
            const state = {
                ...initialState,
                loading: false,
            }
            expect(reducer(state, setLoadingBasesState(true)).loading).toBe(true)
        })
    })

    describe('addBase()', () => {
        it('Should add new base', () => {
            const state = {
                ...initialState,
                list: [],
            }
            const expectedList = [{ id: 12, title: 'Tree', price: 800 }]
            const resultedState = reducer(state, addBase({ id: 12, title: 'Tree', price: 800 }))
            expect(resultedState.list).toEqual(expectedList)
        })
    })

    describe('deleteBase()', () => {
        it('Should delete base and remove it from remember list', () => {
            const state = {
                ...initialState,
                list: [
                    { id: 1, title: 'Tree1', price: 800 },
                    { id: 2, title: 'Tree2', price: 800 },
                ],
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

    describe('setBases()', () => {
        it('Should add bases', () => {
            const state = {
                ...initialState,
                list: [{ id: 2, title: 'Tree2', price: 800 }],
            }
            const expectedList = [
                { id: 3, title: 'Tree2', price: 800 },
                { id: 4, title: 'Tree2', price: 800 },
            ]
            const resultedState = reducer(
                state,
                setBases([
                    { id: 3, title: 'Tree2', price: 800 },
                    { id: 4, title: 'Tree2', price: 800 },
                ])
            )
            expect(resultedState.list).toEqual(expectedList)
        })
    })

    describe('addCard()', () => {
        it('Should add card to base', () => {
            const oldCard = { id: 4, baseId: 2, text: 'More', translate: 'Anymore' }
            const newCard = { id: 5, baseId: 1, text: 'Some', translate: 'Another' }
            const state = {
                ...initialState,
                cards: [oldCard],
            }

            const resultedState = reducer(state, addCard(newCard))
            expect(resultedState.cards).toEqual([oldCard, newCard])
        })
    })
})
