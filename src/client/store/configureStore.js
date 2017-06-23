import { createStore, compose, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import rootReducer from '../reducers'

const persistConfig = { whitelist: ['card'] }

export const configureStoreProd = initialState => {
    const middlewares = [
        // Add other middleware on this line...

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
    ]

    const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)))
    persistStore(store, persistConfig)
    return store
}

export const configureStoreDev = initialState => {
    const middlewares = [
        // Add other middleware on this line...

        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
    ]

    // add support for Redux dev tools
    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default // eslint-disable-line global-require
            store.replaceReducer(nextReducer)
        })
    }

    persistStore(store, persistConfig)
    return store
}

const configureStore = process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev

export default configureStore
