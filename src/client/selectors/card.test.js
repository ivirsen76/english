import { minNewId } from 'reducers/card'
import {
    getNextNewId,
    getLatestLabel,
    getCardTotal,
    getRememberTotalCards,
    getRememberCurrentCard,
    getRememberList,
    getNextRememberCardSounds,
} from './card'

describe('Card selectors', () => {
    it('Should return next card sounds', () => {
        const state = {
            card: {
                list: [
                    { id: 1, status: 0 },
                    { id: 2, status: 0, usSoundFile: '1.mp3', ruSoundFile: '2.mp3' },
                ],
                remember: {
                    list: [1, 2],
                    currentCardIndex: 0,
                },
            },
        }
        expect(getNextRememberCardSounds(state)).toEqual(['1.mp3', '2.mp3'])
    })

    it('Should return total cards to remember', () => {
        const state = {
            card: {
                list: [
                    { id: 1, status: 0, label: 'some' },
                    { id: 2, status: 1 },
                    { id: 3, status: 0, label: 'testing' },
                ],
                remember: {
                    params: {
                        label: 'test',
                    },
                },
            },
        }
        expect(getRememberTotalCards(state)).toBe(1)
    })

    it('Should get remember list', () => {
        const state = {
            card: {
                list: [
                    { id: 1, status: 0, label: 'some' },
                    { id: 2, status: 1 },
                    { id: 3, status: 0, label: 'testing' },
                ],
                remember: {
                    params: {
                        label: 'test',
                    },
                },
            },
        }
        expect(getRememberList(state)).toEqual([{ id: 3, status: 0, label: 'testing' }])
    })

    describe('getRememberCurrentCard()', () => {
        it('Should return current card to remember', () => {
            const state = {
                card: {
                    list: [{ id: 2, text: 'Some', translate: 'Another' }],
                    remember: {
                        list: [1, 2, 3],
                        currentCardIndex: 1,
                    },
                },
            }
            expect(getRememberCurrentCard(state)).toEqual({
                id: 2,
                text: 'Some',
                translate: 'Another',
            })
        })

        it('Should return empty object', () => {
            const state = {
                card: {
                    list: [{ id: 2, text: 'Some', translate: 'Another' }],
                    remember: {
                        list: [1, 2, 3],
                        currentCardIndex: 0,
                    },
                },
            }
            expect(getRememberCurrentCard(state)).toEqual({})
        })
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

    describe('getCardTotal()', () => {
        it('Should return number of cards', () => {
            const state = {
                card: {
                    list: [{ id: 1 }, { id: 2 }],
                },
            }
            expect(getCardTotal(state)).toBe(2)
        })
    })
})
