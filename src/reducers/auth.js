import { handleActions, createAction } from 'redux-actions';
import _pick from 'lodash/pick';


// Initial state
export const initialState = {
    token: null,
    user: {},
};


// Actions
const SET_TOKEN = 'english/auth/SET_TOKEN';
const DISCARD_TOKEN = 'english/auth/DISCARD_TOKEN';
const SET_USER = 'english/auth/SET_USER';


// Action Creators
export const setToken = createAction(SET_TOKEN);
export const discardToken = createAction(DISCARD_TOKEN);
export const setUser = createAction(SET_USER);


// Reducer
export default handleActions({
    [SET_TOKEN]: (state, action) => ({
        ...initialState,
        token: action.payload,
    }),
    [DISCARD_TOKEN]: (state, action) => ({
        ...initialState,
        token: null,
    }),
    [SET_USER]: (state, action) => ({
        ...initialState,
        user: _pick(action.payload, ['email']),
    }),
}, initialState);
