/* global describe, it, expect */
import { minNewId } from 'reducers/card'
import {
    getNextNewId,
    getLatestLabel,
    getCardCount,
} from './card'


describe('Card selectors', () => {
    describe('getNextNewId()', () => {
        it('Should return next new id', () => {
            const state = {
                card: {
                    list: [
                        { id: 1 },
                    ],
                },
            }
            expect(getNextNewId(state)).toBe(minNewId)
        })

        it('Should return next new id', () => {
            const state = {
                card: {
                    list: [
                        { id: minNewId },
                    ],
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
                    list: [
                        { id: 1 },
                    ],
                },
            }
            expect(getLatestLabel(state)).toBe('')
        })

        it('Should return latest label', () => {
            const state = {
                card: {
                    list: [
                        { id: 2, label: 'second' },
                        { id: 1, label: 'first' },
                    ],
                },
            }
            expect(getLatestLabel(state)).toBe('second')
        })
    })


    describe('getCardCount()', () => {
        it('Should return number of cards', () => {
            const state = {
                card: {
                    list: [
                        { id: 1 },
                        { id: 2 },
                    ],
                },
            }
            expect(getCardCount(state)).toBe(2)
        })
    })
})
