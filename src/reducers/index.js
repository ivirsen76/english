import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import card from './card';

const rootReducer = combineReducers({
    card,
    form: formReducer,
    routing: routerReducer,
});

export default rootReducer;
