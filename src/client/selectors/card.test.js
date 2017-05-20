import { minNewId } from 'reducers/card'
import { getNextNewId, getLatestLabel, getCardCount, getListForRemember, getTotalCardsToRemember } from './card'

describe('Card selectors', () => {
    it('Should return total cards to remember', () => {
        const state = {
            card: {
                remember: {
                    list: [1, 2, 3],
                },
            },
        }
        expect(getTotalCardsToRemember(state)).toBe(3)
    })

    describe('getNextNewId()', () => {
        it('Should return next new id', () => {
            const state = {
                card: {
                    list: [{ id: 1 }],
                },
            }
            expect(getNextNewId(state)).toBe(minNewId)
        })

        it('Should return next new id', () => {
            const state = {
                card: {
                    list: [{ id: minNewId }],
                },
            }
            expect(getNextNewId(state)).toBe(minNewId + 1)
        })
    })

    describe('getLatestLabel()', () => {
        it('Should return empty string for empty list', () => {
            const state = {
                card: {
                    list: [],
                },
            }
            expect(getLatestLabel(state)).toBe('')
        })

        it('Should return empty string for the list without label', () => {
            const state = {
                card: {
                    list: [{ id: 1 }],
                },
            }
            expect(getLatestLabel(state)).toBe('')
        })

        it('Should return latest label', () => {
            const state = {
                card: {
                    list: [{ id: 2, label: 'second' }, { id: 1, label: 'first' }],
                },
            }
            expect(getLatestLabel(state)).toBe('second')
        })
    })

    describe('getCardCount()', () => {
        it('Should return number of cards', () => {
            const state = {
                card: {
                    list: [{ id: 1 }, { id: 2 }],
                },
            }
            expect(getCardCount(state)).toBe(2)
        })
    })

    describe('getListForRemember()', () => {
        it('Should return list of remembering cards', () => {
            const state = {
                card: {
                    list: [{ id: 1, status: 0 }, { id: 2, status: 0 }, { id: 3, status: 1 }],
                },
            }
            const expectedList = [{ id: 1, status: 0 }, { id: 2, status: 0 }]
            expect(getListForRemember(state)).toEqual(expectedList)
        })
    })
})
