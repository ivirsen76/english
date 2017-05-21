import { handleActions, createAction } from 'redux-actions'
import _max from 'lodash/max'
import _pick from 'lodash/pick'
import _omit from 'lodash/omit'
import axios from 'utils/axios'

export const minNewId = 1000000000

export const acceptedFields = [
    'text',
    'translate',
    'label',
    'ruSoundFile',
    'ruSoundLength',
    'usSoundFile',
    'usSoundLength',
    'ukSoundFile',
    'ukSoundLength',
    'status',
]

// Initial state
export const initialState = {
    loading: true,
    list: [],
    remember: {
        list: [],
        cardLimit: 100,
        params: {
            isEnFirst: true,
            isAutoPlayMode: false,
            isEnSound: true,
            isRuSound: false,
            label: '',
        },
        currentCardIndex: 0,
        step: 1,
    },
}

// Actions
const ADD_CARD = 'english/card/ADD_CARD'
const DELETE_CARD = 'english/card/DELETE_CARD'
const UPDATE_CARD = 'english/card/UPDATE_CARD'
const UPDATE_CARD_DATA = 'english/card/UPDATE_CARD_DATA'
const SET_CARDS = 'english/card/SET_CARDS'
const SET_LOADING_CARDS_STATE = 'english/card/SET_LOADING_CARDS_STATE'
const SET_REMEMBER_CARDS = 'english/card/SET_REMEMBER_CARDS'
const GO_NEXT_REMEMBER_CARD = 'english/card/GO_NEXT_REMEMBER_CARD'

// Action Creators
export const addCardWithoutSaving = createAction(ADD_CARD)
export const deleteCard = createAction(DELETE_CARD)
export const updateCardWithoutSaving = createAction(UPDATE_CARD)
export const updateCardData = createAction(UPDATE_CARD_DATA)
export const setCards = createAction(SET_CARDS)
export const setLoadingCardsState = createAction(SET_LOADING_CARDS_STATE)
export const setRememberCards = createAction(SET_REMEMBER_CARDS)
export const goNextRememberCard = createAction(GO_NEXT_REMEMBER_CARD)

export const addCard = cardInfo => async (dispatch, getState) => {
    dispatch(addCardWithoutSaving(cardInfo))
    const response = await axios.post('/cards', cardInfo)
    dispatch(updateCardData(response.data))
}

export const updateCard = cardInfo => async (dispatch, getState) => {
    const result = _pick(cardInfo, ['text', 'translate', 'label'])
    dispatch(updateCardWithoutSaving({ id: cardInfo.id, ...result }))
    const response = await axios.patch(`/cards/${cardInfo.id}`, result)
    dispatch(updateCardData(response.data))
}

export const loadCards = () => async (dispatch, getState) => {
    dispatch(setLoadingCardsState(true))
    const res = await axios.get('/cards')
    dispatch(setCards(res.data.data))
    dispatch(setLoadingCardsState(false))
}

// Reducer
export default handleActions(
    {
        [ADD_CARD]: (state, action) => {
            const nextId = _max([...state.list.map(item => item.id + 1), minNewId])

            return {
                ...state,
                list: [...state.list, { id: nextId, ..._pick(action.payload, acceptedFields) }],
            }
        },
        [DELETE_CARD]: (state, action) => ({
            ...state,
            list: state.list.filter(item => item.id !== action.payload),
        }),
        [UPDATE_CARD]: (state, action) => ({
            ...state,
            list: state.list.map(item => {
                if (item.id === action.payload.id) {
                    let result = {
                        ...item,
                        ..._pick(action.payload, ['text', 'translate', 'label']),
                    }
                    if (item.text !== result.text) {
                        result = _omit(result, [
                            'ukSoundFile',
                            'ukSoundLength',
                            'usSoundFile',
                            'usSoundLength',
                        ])
                    }
                    if (item.translate !== result.translate) {
                        result = _omit(result, ['ruSoundFile', 'ruSoundLength'])
                    }

                    return result
                }

                return item
            }),
        }),
        [UPDATE_CARD_DATA]: (state, action) => ({
            ...state,
            list: state.list.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        ..._pick(action.payload, acceptedFields),
                    }
                }

                if (
                    item.id >= minNewId &&
                    action.payload.text === item.text &&
                    action.payload.translate === item.translate
                ) {
                    return {
                        ...item,
                        ..._pick(action.payload, ['id', ...acceptedFields]),
                    }
                }

                return item
            }),
        }),
        [SET_CARDS]: (state, action) => ({
            ...state,
            list: action.payload.map(item => _pick(item, ['id', ...acceptedFields])),
        }),
        [SET_REMEMBER_CARDS]: (state, action) => {
            const rememberList = state.list.filter(card => card.status === 0).map(card => card.id)
            return {
                ...state,
                remember: {
                    ...state.remember,
                    list: rememberList,
                    currentCardIndex: 0,
                },
            }
        },
        [SET_LOADING_CARDS_STATE]: (state, action) => ({
            ...state,
            loading: !!action.payload,
        }),
        [GO_NEXT_REMEMBER_CARD]: (state, action) => {
            if (state.remember.step === 1) {
                return {
                    ...state,
                    remember: {
                        ...state.remember,
                        step: 2,
                    },
                }
            }

            const currentCardIndex = state.remember.currentCardIndex
            return {
                ...state,
                remember: {
                    ...state.remember,
                    step: 1,
                    currentCardIndex: state.remember.list[currentCardIndex + 1]
                        ? currentCardIndex + 1
                        : 0,
                },
            }
        },
    },
    initialState
)