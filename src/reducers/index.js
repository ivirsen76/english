import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import word from './word';

const rootReducer = combineReducers({
    word,
    routing: routerReducer,
});

export default rootReducer;
