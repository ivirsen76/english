import { createStore, compose, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { persistStore } from 'redux-persist'
import history from './history'
import rootReducer from '../reducers'

const persistConfig = { whitelist: ['card', 'auth'] }

export const configureStoreProd = initialState => {
    const reactRouterMiddleware = routerMiddleware(history)
    const middlewares = [thunk, reactRouterMiddleware]

    const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)))
    persistStore(store, persistConfig)
    return store
}

export const configureStoreDev = initialState => {
    const reactRouterMiddleware = routerMiddleware(history)
    const middlewares = [reduxImmutableStateInvariant(), thunk, reactRouterMiddleware]

    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    )

    persistStore(store, persistConfig)
    return store
}

const configureStore =
    process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
