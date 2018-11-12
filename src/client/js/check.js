import _set from 'lodash/set'

_set(window, 'ieremeev.check', {
    shuffleCards: !!process.env.IE_SHUFFLE_CARDS,
})
