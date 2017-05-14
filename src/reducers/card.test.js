/* global describe, it, expect */
import reducer, {
    initialState,
    addCardWithoutSaving as addCard,
    deleteCard,
    updateCardWithoutSaving as updateCard,
    updateCardData,
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
        it('Should update text in a card', () => {
            const state = {
                ...initialState,
                list: [
                    {
                        id: 1,
                        text: 'Ball',
                        translate: 'Some',
                        ukSoundFile: '1',
                        ukSoundLength: 100,
                        usSoundFile: '1',
                        usSoundLength: 100,
                        ruSoundFile: '1',
                        ruSoundLength: 100,
                    },
                    { id: 2, text: 'Tree', translate: 'Some' },
                ],
            }
            const expectedList = [
                {
                    id: 1,
                    text: 'One',
                    translate: 'Some',
                    ruSoundFile: '1',
                    ruSoundLength: 100,
                },
                { id: 2, text: 'Tree', translate: 'Some' },
            ]
            const resultedState = reducer(state, updateCard({ id: 1, text: 'One', unknown: 1 }))
            expect(resultedState.list).toEqual(expectedList)
        })

        it('Should update translate in a card', () => {
            const state = {
                ...initialState,
                list: [
                    {
                        id: 1,
                        text: 'Ball',
                        translate: 'Some',
                        ukSoundFile: '1',
                        ukSoundLength: 100,
                        usSoundFile: '1',
                        usSoundLength: 100,
                        ruSoundFile: '1',
                        ruSoundLength: 100,
                    },
                ],
            }
            const expectedList = [
                {
                    id: 1,
                    text: 'Ball',
                    translate: 'Another',
                    ukSoundFile: '1',
                    ukSoundLength: 100,
                    usSoundFile: '1',
                    usSoundLength: 100,
                },
            ]
            const resultedState = reducer(state, updateCard({ id: 1, translate: 'Another' }))
            expect(resultedState.list).toEqual(expectedList)
        })
    })

    describe('updateCardData()', () => {
        it('Should update card using text', () => {
            const state = {
                ...initialState,
                list: [
                    { id: 1000000000, text: 'Ball', translate: 'Some' },
                ],
            }
            const expectedList = [
                {
                    id: 4,
                    text: 'Ball',
                    translate: 'Some',
                    ruSoundFile: '1',
                    ruSoundLength: 100,
                    usSoundFile: '1',
                    usSoundLength: 100,
                    ukSoundFile: '1',
                    ukSoundLength: 100,
                },
            ]
            const resultedState = reducer(state, updateCardData({
                id: 4,
                text: 'Ball',
                translate: 'Some',
                ruSoundFile: '1',
                ruSoundLength: 100,
                usSoundFile: '1',
                usSoundLength: 100,
                ukSoundFile: '1',
                ukSoundLength: 100,
            }))
            expect(resultedState.list).toEqual(expectedList)
        })

        it('Should update the same card', () => {
            const state = {
                ...initialState,
                list: [
                    { id: 1, text: 'Ball', translate: 'Some' },
                ],
            }
            const expectedList = [
                { id: 1, text: 'Ball', translate: 'Another' },
            ]
            const resultedState = reducer(state, updateCardData({
                id: 1,
                text: 'Ball',
                translate: 'Another',
            }))
            expect(resultedState.list).toEqual(expectedList)
        })

        it('Should not update card', () => {
            const state = {
                ...initialState,
                list: [
                    { id: 3, text: 'Ball', translate: 'Some' },
                ],
            }
            const expectedList = [
                { id: 3, text: 'Ball', translate: 'Some' },
            ]
            const resultedState = reducer(state, updateCardData({
                id: 4,
                text: 'Ball',
                translate: 'Some',
                ruSoundFile: '1',
                ruSoundLength: 100,
            }))
            expect(resultedState.list).toEqual(expectedList)
        })
    })

    describe('setCards()', () => {
        it('Should add cards', () => {
            const state = {
                ...initialState,
                list: [
                    { id: 1, text: 'Ball', translate: 'Some', label: '1' },
                ],
            }
            const expectedList = [
                { id: 3, text: 'One', translate: 'Some', label: '123' },
                {
                    id: 4,
                    text: 'Tree',
                    translate: 'Some',
                    label: '456',
                    ruSoundFile: '1',
                    ruSoundLength: 100,
                    usSoundFile: '1',
                    usSoundLength: 100,
                    ukSoundFile: '1',
                    ukSoundLength: 100,
                },
            ]
            const resultedState = reducer(state, setCards([
                { id: 3, text: 'One', translate: 'Some', label: '123', 'another': 33 },
                {
                    id: 4,
                    text: 'Tree',
                    translate: 'Some',
                    label: '456',
                    ruSoundFile: '1',
                    ruSoundLength: 100,
                    usSoundFile: '1',
                    usSoundLength: 100,
                    ukSoundFile: '1',
                    ukSoundLength: 100,
                    some: 55,
                },
            ]))
            expect(resultedState.list).toEqual(expectedList)
        })
    })
})
