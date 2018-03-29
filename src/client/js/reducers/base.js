import { handleActions, createAction } from 'redux-actions'
import axios from 'utils/axios'

export const minNewId = 1000000000
export const maxWriteAttempts = 3

// Initial state
export const initialState = {
    loading: true,
    list: [],
}

// Actions
const ADD_BASE = 'english/base/ADD_BASE'
const DELETE_BASE = 'english/base/DELETE_BASE'
const UPDATE_BASE = 'english/base/UPDATE_BASE'
const SET_LOADING_BASES_STATE = 'english/base/SET_LOADING_BASES_STATE'
const SET_BASES = 'english/base/SET_BASES'

// Action Creators
export const addBaseWithoutSaving = createAction(ADD_BASE)
export const deleteBaseWithoutSaving = createAction(DELETE_BASE)
export const updateBaseWithoutSaving = createAction(UPDATE_BASE)
export const setLoadingBasesState = createAction(SET_LOADING_BASES_STATE)
export const setBases = createAction(SET_BASES)

export const addBase = baseInfo => async (dispatch, getState) => {
    const response = await axios.post('/bases', baseInfo)
    dispatch(addBaseWithoutSaving(response.data))
}

export const updateBase = baseInfo => async (dispatch, getState) => {
    await axios.patch(`/bases/${baseInfo.id}`, baseInfo)
    dispatch(updateBaseWithoutSaving(baseInfo))
}

export const deleteBase = baseId => async (dispatch, getState) => {
    await axios.delete(`/bases/${baseId}`)
    dispatch(deleteBaseWithoutSaving(baseId))
}

export const loadBases = () => async (dispatch, getState) => {
    dispatch(setLoadingBasesState(true))
    const response = await axios.get('/bases')
    dispatch(setBases(response.data.data))
    dispatch(setLoadingBasesState(false))
}

// Reducer
export default handleActions(
    {
        [ADD_BASE]: (state, action) => ({
            ...state,
            list: [...state.list, action.payload],
        }),
        [DELETE_BASE]: (state, action) => ({
            ...state,
            list: state.list.filter(item => item.id !== action.payload),
        }),
        [UPDATE_BASE]: (state, action) => ({
            ...state,
            list: state.list.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        ...action.payload,
                    }
                }

                return item
            }),
        }),
        [SET_BASES]: (state, action) => ({
            ...state,
            list: action.payload,
        }),
        [SET_LOADING_BASES_STATE]: (state, action) => ({
            ...state,
            loading: !!action.payload,
        }),
    },
    initialState
)
