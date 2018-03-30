import { handleActions, createAction } from 'redux-actions'
import { REHYDRATE } from 'redux-persist/constants'
import _pick from 'lodash/pick'
import axios from 'js/utils/axios'
import history from '../store/history'
import { SubmissionError } from 'redux-form'
import cookie from 'js-cookie'
import { set } from 'dot-prop-immutable'

// Initial state
export const initialState = {
    token: null,
    user: {},
}

// Actions
const SET_TOKEN = 'english/auth/SET_TOKEN'
const DISCARD_TOKEN = 'english/auth/DISCARD_TOKEN'
const SET_USER = 'english/auth/SET_USER'

// Action Creators
export const setToken = createAction(SET_TOKEN)
export const discardToken = createAction(DISCARD_TOKEN)
export const setUser = createAction(SET_USER)

export const logout = token => (dispatch, getState) => {
    dispatch(discardToken(token))
    cookie.remove('token')
}

export const authenticate = token => async (dispatch, getState) => {
    dispatch(setToken(token))
    axios.defaults.headers.common.Authorization = token
}

// This is not exactly an action creator
export const login = async (dispatch, { email, password }) => {
    try {
        const res = await axios.post('/auth/local', { email, password })
        cookie.set('token', res.data.token)
        dispatch(authenticate(res.data.token))
        dispatch(setUser(res.data.data))
        history.push('/user/cards')
    } catch (e) {
        throw new SubmissionError({ email: 'User or password are wrong' })
    }
}

// Reducer
export default handleActions(
    {
        [REHYDRATE]: (state, action) => {
            const savedData = action.payload.auth
            if (!savedData) {
                return state
            }
            return set(state, 'user', user => ({ ...user, ...savedData.user }))
        },
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
    },
    initialState
)
