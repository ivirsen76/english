import { handleActions, createAction } from 'redux-actions';


// Initial state
export const initialState = {
    list: [
        { id: 1, name: 'Mike', email: 'mike@gmail.com' },
        { id: 2, name: 'Helen', email: 'helen@gmail.com' },
        { id: 3, name: 'Bob', email: 'bob@gmail.com' },
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
