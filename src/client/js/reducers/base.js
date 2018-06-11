import { handleActions, createAction } from 'redux-actions'
import axios from '@ieremeev/axios'
import _pick from 'lodash/pick'

// Initial state
export const initialState = {
    loading: true,
    list: [],
    cards: [],
}

// Actions
const ADD_BASE = 'english/base/ADD_BASE'
const DELETE_BASE = 'english/base/DELETE_BASE'
const UPDATE_BASE = 'english/base/UPDATE_BASE'
const SET_LOADING_BASES_STATE = 'english/base/SET_LOADING_BASES_STATE'
const SET_BASES = 'english/base/SET_BASES'
const ADD_CARD = 'english/base/ADD_CARD'
const UPDATE_CARD = 'english/base/UPDATE_CARD'
const SET_CARDS_FOR_BASE = 'english/base/SET_CARDS_FOR_BASE'

// Action Creators
export const addBaseWithoutSaving = createAction(ADD_BASE)
export const deleteBaseWithoutSaving = createAction(DELETE_BASE)
export const updateBaseWithoutSaving = createAction(UPDATE_BASE)
export const setLoadingBasesState = createAction(SET_LOADING_BASES_STATE)
export const setBases = createAction(SET_BASES)
export const addCardWithoutSaving = createAction(ADD_CARD)
export const updateCardWithoutSaving = createAction(UPDATE_CARD)
export const setCardsForBase = createAction(SET_CARDS_FOR_BASE)

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

export const loadCards = baseId => async (dispatch, getState) => {
    const response = await axios.get(`/basecards?baseId=${baseId}`)
    dispatch(setCardsForBase({ baseId, cards: response.data.data }))
}

export const addCard = cardInfo => async (dispatch, getState) => {
    const response = await axios.post('/basecards', cardInfo)
    dispatch(addCardWithoutSaving(response.data))
}

export const updateCard = cardInfo => async (dispatch, getState) => {
    const result = _pick(cardInfo, ['id', 'text', 'translate'])
    dispatch(updateCardWithoutSaving(result))
    await axios.patch(`/basecards/${cardInfo.id}`, result)
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
        [ADD_CARD]: (state, action) => ({
            ...state,
            cards: [...state.cards, action.payload],
        }),
        [UPDATE_CARD]: (state, action) => {
            const cardId = action.payload.id

            return {
                ...state,
                cards: state.cards.map(item => {
                    if (item.id !== cardId) {
                        return item
                    }

                    return { ...item, ...action.payload }
                }),
            }
        },
        [SET_CARDS_FOR_BASE]: (state, action) => {
            const { baseId, cards } = action.payload

            return {
                ...state,
                cards: [
                    ...state.cards.filter(item => item.baseId !== baseId),
                    ...cards.map(item => ({ ...item, baseId })),
                ],
            }
        },
    },
    initialState
)
