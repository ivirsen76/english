import { handleActions, createAction } from 'redux-actions';
import _max from 'lodash/max';
import _pick from 'lodash/pick';

export const minNewId = 1000000000;


// Initial state
export const initialState = {
    list: [
        { id: 1, text: 'Tree', translate: 'Дерево' },
        { id: 2, text: 'Core', translate: 'Ядро' },
        { id: 3, text: 'Ball', translate: 'Мяч' },
    ],
};


// Actions
const ADD_CARD = 'english/card/ADD_CARD';


// Action Creators
export const addCard = createAction(ADD_CARD);


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
}, initialState);
