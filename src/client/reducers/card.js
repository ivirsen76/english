import { handleActions, createAction } from 'redux-actions'
import { REHYDRATE } from 'redux-persist/constants'
import _max from 'lodash/max'
import _pick from 'lodash/pick'
import _keys from 'lodash/keys'
import _omit from 'lodash/omit'
import _find from 'lodash/find'
import axios from 'utils/axios'
import { set } from 'dot-prop-immutable'

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
    'createdAt',
]

// Initial state
export const initialState = {
    loading: true,
    list: [],
    remember: {
        list: [],
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
    write: {
        list: [],
        limit: 10,
        params: {},
        currentCardIndex: 0,
    },
}

// Actions
const ADD_CARD = 'english/card/ADD_CARD'
const DELETE_CARD = 'english/card/DELETE_CARD'
const UPDATE_CARD = 'english/card/UPDATE_CARD'
const UPDATE_CARD_DATA = 'english/card/UPDATE_CARD_DATA'
const SET_CARDS = 'english/card/SET_CARDS'
const SET_LOADING_CARDS_STATE = 'english/card/SET_LOADING_CARDS_STATE'
// Remember actions
const SET_REMEMBER_CARDS = 'english/card/SET_REMEMBER_CARDS'
const GO_NEXT_REMEMBER_CARD = 'english/card/GO_NEXT_REMEMBER_CARD'
const UPDATE_REMEMBER_PARAMS = 'english/card/UPDATE_REMEMBER_PARAMS'
const TOGGLE_REMEMBER_PLAY_MODE = 'english/card/TOGGLE_REMEMBER_PLAY_MODE'
const TOGGLE_REMEMBER_SOUND = 'english/card/TOGGLE_REMEMBER_SOUND'
const SWITCH_REMEMBER_ORDER = 'english/card/SWITCH_REMEMBER_ORDER'
const UPDATE_REMEMBER_LABEL = 'english/card/UPDATE_REMEMBER_LABEL'
const REMEMBER_CARD = 'english/card/REMEMBER_CARD'
// Write actions
const SET_WRITE_CARDS = 'english/card/SET_WRITE_CARDS'
const GO_NEXT_WRITE_CARD = 'english/card/GO_NEXT_WRITE_CARD'

// Action Creators
export const addCardWithoutSaving = createAction(ADD_CARD)
export const deleteCardWithoutSaving = createAction(DELETE_CARD)
export const updateCardWithoutSaving = createAction(UPDATE_CARD)
export const updateCardData = createAction(UPDATE_CARD_DATA)
export const setCards = createAction(SET_CARDS)
export const setLoadingCardsState = createAction(SET_LOADING_CARDS_STATE)
export const setRememberCards = createAction(SET_REMEMBER_CARDS)
export const goNextRememberCard = createAction(GO_NEXT_REMEMBER_CARD)
export const updateRememberParams = createAction(UPDATE_REMEMBER_PARAMS)
export const toggleRememberPlayMode = createAction(TOGGLE_REMEMBER_PLAY_MODE)
export const toggleRememberSound = createAction(TOGGLE_REMEMBER_SOUND)
export const switchRememberOrder = createAction(SWITCH_REMEMBER_ORDER)
export const updateRememberLabel = createAction(UPDATE_REMEMBER_LABEL)
export const rememberCardWithoutSaving = createAction(REMEMBER_CARD)
export const setWriteCards = createAction(SET_WRITE_CARDS)
export const goNextWriteCard = createAction(GO_NEXT_WRITE_CARD)

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

export const deleteCard = cardId => async (dispatch, getState) => {
    dispatch(deleteCardWithoutSaving(cardId))
    await axios.delete(`/cards/${cardId}`)
}

export const rememberCard = cardId => async (dispatch, getState) => {
    dispatch(rememberCardWithoutSaving(cardId))
    await axios.patch(`/cards/${cardId}`, { status: 1 })
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
        [REHYDRATE]: (state, action) => {
            const savedData = action.payload.card
            if (!savedData) {
                return state
            }
            return set(state, 'remember.params', params => ({
                ...params,
                ...savedData.remember.params,
            }))
        },
        [ADD_CARD]: (state, action) => {
            const nextId = _max([...state.list.map(item => item.id + 1), minNewId])

            return {
                ...state,
                list: [...state.list, { id: nextId, ..._pick(action.payload, acceptedFields) }],
            }
        },
        [DELETE_CARD]: (state, action) => {
            const newRememberList = state.remember.list.filter(item => item !== action.payload)

            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload),
                remember: {
                    ...state.remember,
                    list: newRememberList,
                    step: 1,
                    currentCardIndex: newRememberList.length < state.remember.currentCardIndex + 1
                        ? 0
                        : state.remember.currentCardIndex,
                },
            }
        },
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
                    step: 1,
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
        [UPDATE_REMEMBER_PARAMS]: (state, action) => ({
            ...state,
            remember: {
                ...state.remember,
                params: {
                    ...state.remember.params,
                    ..._pick(action.payload, _keys(initialState.remember.params)),
                },
            },
        }),
        [TOGGLE_REMEMBER_PLAY_MODE]: (state, action) => ({
            ...state,
            remember: {
                ...state.remember,
                params: {
                    ...state.remember.params,
                    isAutoPlayMode: !state.remember.params.isAutoPlayMode,
                },
            },
        }),
        [SWITCH_REMEMBER_ORDER]: (state, action) => ({
            ...state,
            remember: {
                ...state.remember,
                params: {
                    ...state.remember.params,
                    isEnFirst: !state.remember.params.isEnFirst,
                },
                step: 1,
            },
        }),
        [UPDATE_REMEMBER_LABEL]: (state, action) => ({
            ...state,
            remember: {
                ...state.remember,
                params: {
                    ...state.remember.params,
                    label: action.payload,
                },
                currentCardIndex: 0,
                step: 1,
            },
        }),
        [TOGGLE_REMEMBER_SOUND]: (state, action) => {
            const languages = {
                us: 'isEnSound',
                uk: 'isEnSound',
                ru: 'isRuSound',
            }

            const key = languages[action.payload]
            if (!key) {
                return state
            }

            return {
                ...state,
                remember: {
                    ...state.remember,
                    params: {
                        ...state.remember.params,
                        [key]: !state.remember.params[key],
                    },
                },
            }
        },
        [REMEMBER_CARD]: (state, action) => {
            const card = _find(state.list, { status: 0, id: action.payload })
            if (!card) {
                return state
            }

            const newRememberList = state.remember.list.filter(item => item !== action.payload)

            return {
                ...state,
                list: state.list.map(
                    item => (item.id === action.payload ? { ...item, status: 1 } : item)
                ),
                remember: {
                    ...state.remember,
                    list: newRememberList,
                    step: 1,
                    currentCardIndex: newRememberList.length < state.remember.currentCardIndex + 1
                        ? 0
                        : state.remember.currentCardIndex,
                },
            }
        },
        [SET_WRITE_CARDS]: (state, action) => {
            const writeList = state.list
                .filter(card => card.status === 1)
                .slice(0, state.write.limit)
                .map(card => card.id)
            return {
                ...state,
                write: {
                    ...state.write,
                    list: writeList,
                    currentCardIndex: 0,
                },
            }
        },
        [GO_NEXT_WRITE_CARD]: (state, action) => {
            const currentCardIndex = state.write.currentCardIndex
            return {
                ...state,
                write: {
                    ...state.write,
                    currentCardIndex: state.write.list[currentCardIndex + 1]
                        ? currentCardIndex + 1
                        : 0,
                },
            }
        },
    },
    initialState
)
