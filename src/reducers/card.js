import { handleActions, createAction } from 'redux-actions';
import _max from 'lodash/max';
import _pick from 'lodash/pick';
import axios from 'axios';

export const minNewId = 1000000000;
const apiEndpoint = 'http://localhost:3030';


// Initial state
export const initialState = {
    list: [],
};


// Actions
const ADD_CARD = 'english/card/ADD_CARD';
const DELETE_CARD = 'english/card/DELETE_CARD';
const UPDATE_CARD = 'english/card/UPDATE_CARD';
const SET_CARDS = 'english/card/SET_CARDS';


// Action Creators
export const addCardWithoutSaving = createAction(ADD_CARD);
export const deleteCard = createAction(DELETE_CARD);
export const updateCard = createAction(UPDATE_CARD);
export const setCards = createAction(SET_CARDS);

export const addCard = cardInfo => async (dispatch, getState) => {
    const state = getState().auth;
    dispatch(addCardWithoutSaving(cardInfo));

    await axios.post(`${apiEndpoint}/cards`, cardInfo, {
        headers: { Authorization: 'Bearer ' + state.token },
    });
};

export const loadCards = () => async (dispatch, getState) => {
    const state = getState().auth;

    const res = await axios.get(`${apiEndpoint}/cards`, {
        headers: { Authorization: 'Bearer ' + state.token },
    });

    dispatch(setCards(res.data.data));
};


// Reducer
export default handleActions({
    [ADD_CARD]: (state, action) => {
        const nextId = _max([...state.list.map(item => item.id + 1), minNewId]);

        return {
            ...state,
            list: [
                ...state.list,
                { id: nextId, ..._pick(action.payload, ['text', 'translate', 'label']) },
            ],
        };
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
                    ..._pick(action.payload, ['text', 'translate', 'label']),
                };
            }

            return item;
        }),
    }),
    [SET_CARDS]: (state, action) => ({
        ...state,
        list: action.payload.map(item => _pick(item, ['id', 'text', 'translate', 'label'])),
    }),
}, initialState);
