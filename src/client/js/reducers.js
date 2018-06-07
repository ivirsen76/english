import auth from './reducers/auth.js';
import card from './reducers/card.js';
import base from './reducers/base.js';

export default {
    auth: { reducer: auth },
    card: { reducer: card },
    base: { reducer: base },
};
