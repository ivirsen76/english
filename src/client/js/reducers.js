import card from './reducers/card.js'
import base, { persistedKeys as basePersistedKeys } from './reducers/base.js'

export default {
    card: { reducer: card },
    base: {
        reducer: base,
        persist: {
            keys: basePersistedKeys,
        },
    },
}
