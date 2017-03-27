import { handleActions, createAction } from 'redux-actions';
import _pick from 'lodash/pick';
import axios from 'utils/axios';
import { browserHistory } from 'react-router';
import { SubmissionError } from 'redux-form';
import cookie from 'react-cookie';


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

export const authenticate = token => async (dispatch, getState) => {
    dispatch(setToken(token));
    axios.defaults.headers.common.Authorization = token;
};


// This is not exactly an action creator
export const login = async (dispatch, { email, password }) => {
    try {
        const res = await axios.post('/auth/local', { email, password });
        cookie.save('token', res.data.token, { path: '/' });
        dispatch(authenticate(res.data.token));
        dispatch(setUser(res.data.data));
        browserHistory.push('/user/cards');
    } catch (e) {
        throw new SubmissionError({ email: 'User or password are wrong' });
    }
};


// Reducer
export default handleActions({
    [SET_TOKEN]: (state, action) => ({
        ...state,
        token: action.payload,
    }),
    [DISCARD_TOKEN]: (state, action) => ({
        ...state,
        token: null,
        user: {},
    }),
    [SET_USER]: (state, action) => ({
        ...state,
        user: _pick(action.payload, ['email']),
    }),
}, initialState);
