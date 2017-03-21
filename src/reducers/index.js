import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import word from './word';

const rootReducer = combineReducers({
    word,
    form: formReducer,
    routing: routerReducer,
});

export default rootReducer;
