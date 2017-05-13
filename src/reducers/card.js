import { handleActions, createAction } from 'redux-actions'
import _max from 'lodash/max'
import _pick from 'lodash/pick'
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
]

// Initial state
export const initialState = {
    list: [],
}


// Actions
const ADD_CARD = 'english/card/ADD_CARD'
const DELETE_CARD = 'english/card/DELETE_CARD'
const UPDATE_CARD = 'english/card/UPDATE_CARD'
const UPDATE_CARD_DATA = 'english/card/UPDATE_CARD_DATA'
const SET_CARDS = 'english/card/SET_CARDS'


// Action Creators
export const addCardWithoutSaving = createAction(ADD_CARD)
export const deleteCard = createAction(DELETE_CARD)
export const updateCard = createAction(UPDATE_CARD)
export const updateCardData = createAction(UPDATE_CARD_DATA)
export const setCards = createAction(SET_CARDS)

export const addCard = cardInfo => async (dispatch, getState) => {
    dispatch(addCardWithoutSaving(cardInfo))
    const response = await axios.post('/cards', cardInfo)
    dispatch(updateCardData(response.data))
}

export const loadCards = () => async (dispatch, getState) => {
    const res = await axios.get('/cards')
    dispatch(setCards(res.data.data))
}


// Reducer
export default handleActions({
    [ADD_CARD]: (state, action) => {
        const nextId = _max([...state.list.map(item => item.id + 1), minNewId])

        return {
            ...state,
            list: [
                ...state.list,
                { id: nextId, ..._pick(action.payload, acceptedFields) },
            ],
        }
    },
    [DELETE_CARD]: (state, action) => ({
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
    }),
    [UPDATE_CARD]: (state, action) => ({
        ...state,
        list: state.list.map((item) => {
            if (item.id === action.payload.id) {
                return {
                    ...item,
                    ..._pick(action.payload, acceptedFields),
                }
            }

            return item
        }),
    }),
    [UPDATE_CARD_DATA]: (state, action) => ({
        ...state,
        list: state.list.map((item) => {
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
}, initialState)
