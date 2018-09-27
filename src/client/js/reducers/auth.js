import { handleActions, createAction } from 'redux-actions'
import _pick from 'lodash/pick'
import axios from '@ieremeev/axios'
// import history from '../store/history'
import cookie from 'js-cookie'

export const persistedKeys = ['user']

// Initial state
export const initialState = {
    user: {},
}

// Actions
const UNSET_USER = 'english/auth/UNSET_USER'
const SET_USER = 'english/auth/SET_USER'

// Action Creators
export const unsetUser = createAction(UNSET_USER)
export const setUser = createAction(SET_USER)

export const setToken = token => (dispatch, getState) => {
    cookie.set('token', token)
    axios.setToken(token)
}

export const logout = () => (dispatch, getState) => {
    cookie.remove('token')
    dispatch(unsetUser())
}

// This is not exactly an action creator
export const login = async (dispatch, { email, password }) => {
    try {
        const res = await axios.post('/auth/local', { email, password })
        dispatch(setToken(res.data.token))
        dispatch(setUser(res.data.data))
    } catch (e) {
        throw { email: 'User or password are wrong' }
    }
}

// Reducer
export default handleActions(
    {
        [UNSET_USER]: (state, action) => ({
            ...state,
            user: {},
        }),
        [SET_USER]: (state, action) => ({
            ...state,
            user: _pick(action.payload, ['email', 'roles']),
        }),
    },
    initialState
)
