/* global describe, it, expect */
import reducer, {
    initialState,
    addCard,
    deleteCard,
    minNewId,
} from './card';


describe('card reducer', () => {
    describe('addCard()', () => {
        it('Should add first new card', () => {
            const state = {
                ...initialState,
                list: [],
            };
            const expectedList = [
                { id: minNewId, text: 'Tree', translate: 'Some', label: 'bla' },
            ];
            const resultedState = reducer(state, addCard({ text: 'Tree', translate: 'Some', label: 'bla' }));
            expect(resultedState.list).toEqual(expectedList);
        });

        it('Should add second new card', () => {
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
            const resultedState = reducer(state, addCard({ text: 'Tree', translate: 'Some' }));
            expect(resultedState.list).toEqual(expectedList);
        });
    });

    describe('deleteCard()', () => {
        it('Should delete card', () => {
            const state = {
                ...initialState,
                list: [
                    { id: 1, text: 'Ball', translate: 'Some' },
                    { id: 2, text: 'Tree', translate: 'Some' },
                ],
            };
            const expectedList = [
                { id: 2, text: 'Tree', translate: 'Some' },
            ];
            expect(reducer(state, deleteCard(1)).list).toEqual(expectedList);
        });
    });
});
