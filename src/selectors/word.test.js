/* global describe, it, expect */
import { minNewId } from 'reducers/word';
import {
    getNextNewId,
    getLatestLabel,
} from './word';


describe('Word selectors', () => {
    describe('getNextNewId()', () => {
        it('Should return next new id', () => {
            const state = {
                word: {
                    list: [
                        { id: 1 },
                    ],
                },
            };
            expect(getNextNewId(state)).toBe(minNewId);
        });

        it('Should return next new id', () => {
            const state = {
                word: {
                    list: [
                        { id: minNewId },
                    ],
                },
            };
            expect(getNextNewId(state)).toBe(minNewId + 1);
        });
    });

    describe('getLatestLabel()', () => {
        it('Should return empty string for empty list', () => {
            const state = {
                word: {
                    list: [],
                },
            };
            expect(getLatestLabel(state)).toBe('');
        });

        it('Should return empty string for the list without label', () => {
            const state = {
                word: {
                    list: [
                        { id: 1 },
                    ],
                },
            };
            expect(getLatestLabel(state)).toBe('');
        });

        it('Should return latest label', () => {
            const state = {
                word: {
                    list: [
                        { id: 2, label: 'second' },
                        { id: 1, label: 'first' },
                    ],
                },
            };
            expect(getLatestLabel(state)).toBe('second');
        });
    });
});
