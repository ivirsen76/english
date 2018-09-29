import { handleActions, createAction } from 'redux-actions'
import axios from '@ieremeev/axios'
import _pick from 'lodash/pick'
import _isEmpty from 'lodash/isEmpty'

export const startNewId = 1000000000

// Initial state
export const initialState = {
    loading: true,
    list: [],
    savedList: [],
    cards: [],
    newId: startNewId,
}

// Actions
const DELETE_BASE = 'english/base/DELETE_BASE'
const UPDATE_BASE = 'english/base/UPDATE_BASE'
const SET_LOADING_BASES_STATE = 'english/base/SET_LOADING_BASES_STATE'
const SET_BASES = 'english/base/SET_BASES'
const ADD_CARD = 'english/base/ADD_CARD'
const DELETE_CARD = 'english/base/DELETE_CARD'
const UPDATE_CARD = 'english/base/UPDATE_CARD'
const SET_CARDS_FOR_BASE = 'english/base/SET_CARDS_FOR_BASE'
const MOVE_ELEMENT = 'english/base/MOVE_ELEMENT'
const ADD_ELEMENT = 'english/base/ADD_ELEMENT'
const UPDATE_BASE_IDS = 'english/base/UPDATE_BASE_IDS'

// Action Creators
export const deleteBaseWithoutSaving = createAction(DELETE_BASE)
export const updateBase = createAction(UPDATE_BASE)
export const setLoadingBasesState = createAction(SET_LOADING_BASES_STATE)
export const setBases = createAction(SET_BASES)
export const addCardWithoutSaving = createAction(ADD_CARD)
export const deleteCardWithoutSaving = createAction(DELETE_CARD)
export const updateCardWithoutSaving = createAction(UPDATE_CARD)
export const setCardsForBase = createAction(SET_CARDS_FOR_BASE)
export const moveElement = createAction(MOVE_ELEMENT)
export const addElement = createAction(ADD_ELEMENT)
export const updateBaseIds = createAction(UPDATE_BASE_IDS)

export const saveBaseTree = () => async (dispatch, getState) => {
    const state = getState().app.base
    const response = await axios.post('/basetree', state.list)
    dispatch(updateBaseIds(response.data))
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
    const state = getState().app.base

    // Increment count of the base
    const base = state.list.find(item => item.id === cardInfo.baseId)
    if (base) {
        dispatch(updateBase(base.id, { count: base.count + 1 }))
    }

    dispatch(addCardWithoutSaving(response.data))
}

export const deleteCard = basecardId => async (dispatch, getState) => {
    await axios.delete(`/basecards/${basecardId}`)
    dispatch(deleteCardWithoutSaving(basecardId))
}

export const updateCard = cardInfo => async (dispatch, getState) => {
    const result = _pick(cardInfo, ['id', 'text', 'translate'])
    const response = await axios.patch(`/basecards/${cardInfo.id}`, result)
    dispatch(updateCardWithoutSaving(response.data))
}

// Reducer
export default handleActions(
    {
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
            savedList: action.payload,
        }),
        [SET_LOADING_BASES_STATE]: (state, action) => ({
            ...state,
            loading: !!action.payload,
        }),
        [ADD_CARD]: (state, action) => ({
            ...state,
            cards: [...state.cards, action.payload],
        }),
        [DELETE_CARD]: (state, action) => ({
            ...state,
            cards: state.cards.filter(item => item.id !== action.payload),
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
        [MOVE_ELEMENT]: (state, action) => {
            const { id, parentId, beforeId = 0 } = action.payload

            const beforeElement = state.list.find(item => item.id === beforeId)
            let beforePosition
            if (beforeElement) {
                beforePosition = beforeElement.position
            } else {
                beforePosition = state.list.filter(item => item.parentId === parentId).length
            }

            const list = state.list.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        parentId,
                        position: beforePosition,
                    }
                }

                if (item.parentId === parentId && item.position >= beforePosition) {
                    return {
                        ...item,
                        position: item.position + 1,
                    }
                }

                return { ...item }
            })

            // Normalize positions
            const processChildren = topId => {
                list
                    .filter(item => item.parentId === topId)
                    .sort((a, b) => a.position - b.position)
                    .forEach((item, index) => {
                        item.position = index
                        processChildren(item.id)
                    })
            }
            processChildren(0)

            return {
                ...state,
                list,
            }
        },
        [ADD_ELEMENT]: (state, action) => {
            const { element, parentId, beforeId = 0 } = action.payload

            const beforeElement = state.list.find(item => item.id === beforeId)
            let beforePosition
            if (beforeElement) {
                beforePosition = beforeElement.position
            } else {
                beforePosition = state.list.filter(item => item.parentId === parentId).length
            }

            const list = state.list.map(item => {
                if (item.parentId === parentId && item.position >= beforePosition) {
                    return {
                        ...item,
                        position: item.position + 1,
                    }
                }

                if (item.parentId === element.parentId && item.position > element.position) {
                    return {
                        ...item,
                        position: item.position - 1,
                    }
                }

                return item
            })

            return {
                ...state,
                list: [
                    ...list,
                    { ...element, id: state.newId, parentId, position: beforePosition },
                ],
                newId: state.newId + 1,
            }
        },
        [UPDATE_BASE_IDS]: (state, action) => {
            const ids = action.payload

            if (_isEmpty(ids)) {
                return {
                    ...state,
                    savedList: state.list,
                }
            }

            const newList = state.list.map(item => ({
                ...item,
                ...(ids[item.id] && { id: ids[item.id] }),
                ...(ids[item.parentId] && { parentId: ids[item.parentId] }),
            }))

            return {
                ...state,
                list: newList,
                savedList: newList,
            }
        },
    },
    initialState
)
