import { handleActions, createAction } from 'redux-actions'
import _pick from 'lodash/pick'
import axios from 'utils/axios'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'
import storage from 'store'

export const storageKey = 'EnglishAuth' // key for browser local storage
export const savedKeys = ['user']


// Initial state
export const initialState = {
    token: null,
    user: {},
}


// Actions
const SET_TOKEN = 'english/auth/SET_TOKEN'
const DISCARD_TOKEN = 'english/auth/DISCARD_TOKEN'
const SET_USER = 'english/auth/SET_USER'
const RESTORE_STATE = 'english/auth/RESTORE_STATE'


// Action Creators
export const setToken = createAction(SET_TOKEN)
export const discardToken = createAction(DISCARD_TOKEN)
export const setUser = createAction(SET_USER)
export const restoreState = createAction(RESTORE_STATE)


export const logout = token => (dispatch, getState) => {
    dispatch(discardToken(token))
    cookie.remove('token', { path: '/' })
}


export const authenticate = token => async (dispatch, getState) => {
    dispatch(setToken(token))

    const savedState = _pick(storage.get(storageKey) || {}, savedKeys)
    dispatch(restoreState(savedState))

    axios.defaults.headers.common.Authorization = token
}


export const saveStateInStorage = () => (dispatch, getState) => {
    const state = getState().auth
    const saved = storage.get(storageKey) || {}
    storage.set(storageKey, {
        ...saved,
        ..._pick(state, savedKeys),
    })
}


// This is not exactly an action creator
export const login = async (dispatch, { email, password }) => {
    try {
        const res = await axios.post('/auth/local', { email, password })
        cookie.save('token', res.data.token, { path: '/' })
        dispatch(authenticate(res.data.token))
        dispatch(setUser(res.data.data))
        dispatch(saveStateInStorage())
        browserHistory.push('/user/cards')
    } catch (e) {
        throw new SubmissionError({ email: 'User or password are wrong' })
    }
}


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
    [RESTORE_STATE]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}, initialState)
