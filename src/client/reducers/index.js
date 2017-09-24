import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import card from './card'
import base from './base'

const rootReducer = combineReducers({
    auth,
    card,
    base,
    form: formReducer,
    routing: routerReducer,
})

export default rootReducer
