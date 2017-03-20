import { handleActions, createAction } from 'redux-actions';


// Initial state
export const initialState = {
    list: [
        { id: 1, text: 'Tree', translate: 'Дерево' },
        { id: 2, text: 'Core', translate: 'Ядро' },
        { id: 3, text: 'Ball', translate: 'Мяч' },
    ],
};


// Actions
const ADD_WORD = 'english/word/ADD_WORD';


// Action Creators
export const addWord = createAction(ADD_WORD);


// Reducer
export default handleActions({
    [ADD_WORD]: (state, action) => ({
        ...state,
    }),
}, initialState);
