import { createSelector } from 'reselect'
import { minNewId } from 'reducers/card'
import _max from 'lodash/max'
import _maxBy from 'lodash/maxBy'
import _find from 'lodash/find'

const getList = state => state.card.list
const getRememberStep = state => state.card.remember.step
const getRememberParams = state => state.card.remember.params
const getRememberSortedList = state => state.card.remember.list
const getRememberCurrentCardIndex = state => state.card.remember.currentCardIndex
const getWriteSortedList = state => state.card.write.list
const getWriteCurrentCardIndex = state => state.card.write.currentCardIndex

export const getRememberList = createSelector(getList, getRememberParams, (list, params) => {
    if (params.label === '') {
        return list.filter(item => item.status === 0)
    }

    return list.filter(item => item.status === 0 && item.label.includes(params.label))
})

export const getNextRememberCardSounds = createSelector(
    getList,
    getRememberSortedList,
    getRememberCurrentCardIndex,
    (list, sortedList, index) => {
        const id = sortedList[index + 1]
        if (!id) {
            return []
        }

        const nextCard = _find(list, { id })
        return [nextCard.usSoundFile, nextCard.ruSoundFile]
    }
)

export const getNextNewId = createSelector(getList, list =>
    _max([...list.map(item => item.id + 1), minNewId])
)

export const getLatestLabel = createSelector(getList, list => {
    const latest = _maxBy(list, item => item.id)
    return latest && latest.label ? latest.label : ''
})

export const getCardTotal = createSelector(getList, list => list.length)

export const getRememberTotalCards = createSelector(
    getRememberList,
    getRememberParams,
    (list, params) => {
        if (params.label === '') {
            return list.length
        }

        return list.filter(item => item.label.includes(params.label)).length
    }
)

export const getWriteTotalCards = createSelector(
    getList,
    list => list.filter(item => item.status === 1).length
)

export const getRememberCurrentCard = createSelector(
    getList,
    getRememberSortedList,
    getRememberCurrentCardIndex,
    (list, rememberSortedList, index) => {
        const id = rememberSortedList[index] || 0
        return _find(list, { id }) || {}
    }
)

export const getRememberFirstWord = createSelector(
    getRememberCurrentCard,
    getRememberParams,
    (currentCard, params) => {
        if (params.isEnFirst) {
            return {
                word: currentCard.text,
                language: 'us',
                isSound: params.isEnSound,
                soundFile: currentCard.usSoundFile,
                soundLength: currentCard.usSoundLength,
            }
        }

        return {
            word: currentCard.translate,
            language: 'ru',
            isSound: params.isRuSound,
            soundFile: currentCard.ruSoundFile,
            soundLength: currentCard.ruSoundLength,
        }
    }
)

export const getRememberSecondWord = createSelector(
    getRememberCurrentCard,
    getRememberParams,
    (currentCard, params) => {
        if (!params.isEnFirst) {
            return {
                word: currentCard.text,
                language: 'us',
                isSound: params.isEnSound,
                soundFile: currentCard.usSoundFile,
                soundLength: currentCard.usSoundLength,
            }
        }

        return {
            word: currentCard.translate,
            language: 'ru',
            isSound: params.isRuSound,
            soundFile: currentCard.ruSoundFile,
            soundLength: currentCard.ruSoundLength,
        }
    }
)

export const getNextStepDelay = createSelector(
    getRememberFirstWord,
    getRememberSecondWord,
    getRememberStep,
    (firstWord, secondWord, step) => {
        let delay
        if (step === 1) {
            if (firstWord.isSound) {
                delay = firstWord.soundLength + secondWord.soundLength + 500
            } else {
                delay = secondWord.soundLength + 1000
            }
        } else {
            delay = secondWord.soundLength + 3000
        }

        return delay
    }
)

export const getWriteCurrentCard = createSelector(
    getList,
    getWriteSortedList,
    getWriteCurrentCardIndex,
    (list, sortedList, index) => {
        const id = sortedList[index] || 0
        return _find(list, { id }) || {}
    }
)

export const getNextWriteCardSounds = createSelector(
    getList,
    getWriteSortedList,
    getWriteCurrentCardIndex,
    (list, sortedList, index) => {
        const id = sortedList[index + 1]
        if (!id) {
            return []
        }

        const nextCard = _find(list, { id })
        return [nextCard.usSoundFile]
    }
)

export const isLastWriteCard = createSelector(
    getWriteSortedList,
    getWriteCurrentCardIndex,
    (sortedList, index) => sortedList.length === index + 1
)

export const getWriteErrorsTotal = createSelector(
    getList,
    getWriteSortedList,
    getWriteCurrentCardIndex,
    (list, sortedList, writeIndex) => {
        const ids = sortedList.slice(0, writeIndex + 1)
        return list.filter(item => ids.includes(item.id) && item.writeRightAttempts === 0).length
    }
)
