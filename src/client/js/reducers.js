import card, { persistedKeys as cardPersistedKeys } from './reducers/card.js'
import base, { persistedKeys as basePersistedKeys } from './reducers/base.js'

export default {
    card: {
        reducer: card,
        persist: { keys: cardPersistedKeys },
    },
    base: {
        reducer: base,
        persist: { keys: basePersistedKeys },
    },
}
