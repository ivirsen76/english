import adjectives from './adjectives.json'
import sentence from './sentence.json'
import _set from 'lodash/set'

_set(window, 'ieremeev.words.adjectives', adjectives)
_set(window, 'ieremeev.words.sentence', sentence)
