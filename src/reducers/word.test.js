/* global describe, it, expect */
import reducer, {
    initialState,
    addWord,
    minNewId,
} from './word';


describe('word reducer', () => {
    describe('addWord()', () => {
        it('Should add first new word', () => {
            const state = {
                ...initialState,
                list: [],
            };
            const expectedList = [
                { id: minNewId, text: 'Tree', translate: 'Some', label: 'bla' },
            ];
            const resultedState = reducer(state, addWord({ text: 'Tree', translate: 'Some', label: 'bla' }));
            expect(resultedState.list).toEqual(expectedList);
        });

        it('Should add second new word', () => {
            const state = {
                ...initialState,
                list: [
                    { id: minNewId, text: 'Ball', translate: 'Some' },
                ],
            };
            const expectedList = [
                { id: minNewId, text: 'Ball', translate: 'Some' },
                { id: minNewId + 1, text: 'Tree', translate: 'Some' },
            ];
            const resultedState = reducer(state, addWord({ text: 'Tree', translate: 'Some' }));
            expect(resultedState.list).toEqual(expectedList);
        });
    });
});
