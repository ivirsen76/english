/* global describe, it, expect */
import reducer, {
    initialState,
    addCardWithoutSaving as addCard,
    deleteCard,
    updateCard,
    minNewId,
    setCards,
} from './card'


describe('card reducer', () => {
    describe('addCard()', () => {
        it('Should add first new card', () => {
            const state = {
                ...initialState,
                list: [],
            }
            const expectedList = [
                { id: minNewId, text: 'Tree', translate: 'Some', label: 'bla' },
            ]
            const resultedState = reducer(state, addCard({ text: 'Tree', translate: 'Some', label: 'bla', unknown: 1 }))
            expect(resultedState.list).toEqual(expectedList)
        })

        it('Should add second new card', () => {
            const state = {
                ...initialState,
                list: [
                    { id: minNewId, text: 'Ball', translate: 'Some' },
                ],
            }
            const expectedList = [
                { id: minNewId, text: 'Ball', translate: 'Some' },
                { id: minNewId + 1, text: 'Tree', translate: 'Some' },
            ]
            const resultedState = reducer(state, addCard({ text: 'Tree', translate: 'Some' }))
            expect(resultedState.list).toEqual(expectedList)
        })
    })

    describe('deleteCard()', () => {
        it('Should delete card', () => {
            const state = {
                ...initialState,
                list: [
                    { id: 1, text: 'Ball', translate: 'Some' },
                    { id: 2, text: 'Tree', translate: 'Some' },
                ],
            }
            const expectedList = [
                { id: 2, text: 'Tree', translate: 'Some' },
            ]
            expect(reducer(state, deleteCard(1)).list).toEqual(expectedList)
        })
    })

    describe('updateCard()', () => {
        it('Should update card', () => {
            const state = {
                ...initialState,
                list: [
                    { id: 1, text: 'Ball', translate: 'Some' },
                    { id: 2, text: 'Tree', translate: 'Some' },
                ],
            }
            const expectedList = [
                { id: 1, text: 'One', translate: 'Some' },
                { id: 2, text: 'Tree', translate: 'Some' },
            ]
            const resultedState = reducer(state, updateCard({ id: 1, text: 'One', unknown: 1 }))
            expect(resultedState.list).toEqual(expectedList)
        })
    })

    describe('setCards()', () => {
        it('Should add cards', () => {
            const state = {
                ...initialState,
                list: [
                    { id: 1, text: 'Ball', translate: 'Some' },
                ],
            }
            const expectedList = [
                { id: 3, text: 'One', translate: 'Some', label: '123' },
                { id: 4, text: 'Tree', translate: 'Some', label: '456' },
            ]
            const resultedState = reducer(state, setCards([
                { id: 3, text: 'One', translate: 'Some', label: '123', 'another': 33 },
                { id: 4, text: 'Tree', translate: 'Some', label: '456', 'some': 55 },
            ]))
            expect(resultedState.list).toEqual(expectedList)
        })
    })
})
