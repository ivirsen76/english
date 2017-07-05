import { minNewId } from 'reducers/card'
import {
    getNextNewId,
    getLatestLabel,
    getCardTotal,
    getRememberTotalCards,
    getRememberCurrentCard,
    getRememberList,
    getRememberFirstWord,
    getRememberSecondWord,
    getNextRememberCardSounds,
    getNextStepDelay,
    getWriteTotalCards,
    getWriteCurrentCard,
    getNextWriteCardSounds,
    isLastWriteCard,
    getWriteErrorsTotal,
    getCurrentWriteCard,
    isLastRememberCard,
} from './card'

describe('Card selectors', () => {
    describe('Should return first word', () => {
        it('Should return first word for en first', () => {
            const state = {
                card: {
                    list: [
                        { id: 1, status: 0, text: 'Some', usSoundFile: '1.mp3', usSoundLength: 1 },
                    ],
                    remember: {
                        list: [1],
                        currentCardIndex: 0,
                        params: {
                            isEnFirst: true,
                            isEnSound: true,
                            isRuSound: false,
                        },
                    },
                },
            }

            expect(getRememberFirstWord(state)).toEqual({
                word: 'Some',
                language: 'us',
                isSound: true,
                soundFile: '1.mp3',
                soundLength: 1,
            })
        })

        it('Should return first word for ru first', () => {
            const state = {
                card: {
                    list: [
                        {
                            id: 1,
                            status: 0,
                            translate: 'Some',
                            ruSoundFile: '1.mp3',
                            ruSoundLength: 1,
                        },
                    ],
                    remember: {
                        list: [1],
                        currentCardIndex: 0,
                        params: {
                            isEnFirst: false,
                            isEnSound: true,
                            isRuSound: false,
                        },
                    },
                },
            }

            expect(getRememberFirstWord(state)).toEqual({
                word: 'Some',
                language: 'ru',
                isSound: false,
                soundFile: '1.mp3',
                soundLength: 1,
            })
        })
    })

    describe('Should return second word', () => {
        it('Should return second word for ru first', () => {
            const state = {
                card: {
                    list: [
                        { id: 1, status: 0, text: 'Some', usSoundFile: '1.mp3', usSoundLength: 1 },
                    ],
                    remember: {
                        list: [1],
                        currentCardIndex: 0,
                        params: {
                            isEnFirst: false,
                            isEnSound: true,
                            isRuSound: false,
                        },
                    },
                },
            }

            expect(getRememberSecondWord(state)).toEqual({
                word: 'Some',
                language: 'us',
                isSound: true,
                soundFile: '1.mp3',
                soundLength: 1,
            })
        })

        it('Should return second word for en first', () => {
            const state = {
                card: {
                    list: [
                        {
                            id: 1,
                            status: 0,
                            translate: 'Some',
                            ruSoundFile: '1.mp3',
                            ruSoundLength: 1,
                        },
                    ],
                    remember: {
                        list: [1],
                        currentCardIndex: 0,
                        params: {
                            isEnFirst: true,
                            isEnSound: true,
                            isRuSound: false,
                        },
                    },
                },
            }

            expect(getRememberSecondWord(state)).toEqual({
                word: 'Some',
                language: 'ru',
                isSound: false,
                soundFile: '1.mp3',
                soundLength: 1,
            })
        })
    })

    describe('Should return next step delay', () => {
        it('Should return delay for first step', () => {
            const state = {
                card: {
                    list: [{ id: 1, status: 0, usSoundLength: 1, ruSoundLength: 2 }],
                    remember: {
                        list: [1],
                        currentCardIndex: 0,
                        step: 1,
                        params: {
                            isEnFirst: true,
                            isEnSound: true,
                            isRuSound: false,
                        },
                    },
                },
            }

            expect(getNextStepDelay(state)).toBe(1 + 2 + 500)
        })

        it('Should return delay for first step without sound on first word', () => {
            const state = {
                card: {
                    list: [{ id: 1, status: 0, usSoundLength: 1, ruSoundLength: 2 }],
                    remember: {
                        list: [1],
                        currentCardIndex: 0,
                        step: 1,
                        params: {
                            isEnFirst: true,
                            isEnSound: false,
                            isRuSound: false,
                        },
                    },
                },
            }

            expect(getNextStepDelay(state)).toBe(2 + 1000)
        })

        it('Should return delay for the second step', () => {
            const state = {
                card: {
                    list: [{ id: 1, status: 0, usSoundLength: 1, ruSoundLength: 2 }],
                    remember: {
                        list: [1],
                        currentCardIndex: 0,
                        step: 2,
                        params: {
                            isEnFirst: true,
                            isEnSound: true,
                            isRuSound: false,
                        },
                    },
                },
            }

            expect(getNextStepDelay(state)).toBe(2 + 3000)
        })

        it('Should return delay for first step when ru is first', () => {
            const state = {
                card: {
                    list: [{ id: 1, status: 0, usSoundLength: 1, ruSoundLength: 2 }],
                    remember: {
                        list: [1],
                        currentCardIndex: 0,
                        step: 1,
                        params: {
                            isEnFirst: false,
                            isEnSound: true,
                            isRuSound: false,
                        },
                    },
                },
            }

            expect(getNextStepDelay(state)).toBe(1 + 1000)
        })

        it('Should return delay for the second step when ru is first', () => {
            const state = {
                card: {
                    list: [{ id: 1, status: 0, usSoundLength: 1, ruSoundLength: 2 }],
                    remember: {
                        list: [1],
                        currentCardIndex: 0,
                        step: 2,
                        params: {
                            isEnFirst: false,
                            isEnSound: true,
                            isRuSound: true,
                        },
                    },
                },
            }

            expect(getNextStepDelay(state)).toBe(1 + 3000)
        })
    })

    it('Should return next card sounds', () => {
        const state = {
            card: {
                list: [
                    { id: 1, status: 0 },
                    { id: 2, status: 0, usSoundFile: '1.mp3', ruSoundFile: '2.mp3' },
                ],
                remember: {
                    list: [1, 2],
                    currentCardIndex: 0,
                },
            },
        }
        expect(getNextRememberCardSounds(state)).toEqual(['1.mp3', '2.mp3'])
    })

    it('Should return total cards to remember', () => {
        const state = {
            card: {
                list: [
                    { id: 1, status: 0, label: 'some' },
                    { id: 2, status: 1 },
                    { id: 3, status: 0, label: 'testing' },
                ],
                remember: {
                    params: {
                        label: 'test',
                    },
                },
            },
        }
        expect(getRememberTotalCards(state)).toBe(1)
    })

    it('Should return total cards to write', () => {
        const state = {
            card: {
                list: [{ id: 1, status: 0 }, { id: 2, status: 1 }, { id: 3, status: 1 }],
            },
        }
        expect(getWriteTotalCards(state)).toBe(2)
    })

    it('Should get remember list', () => {
        const state = {
            card: {
                list: [
                    { id: 1, status: 0, label: 'some' },
                    { id: 2, status: 1 },
                    { id: 3, status: 0, label: 'testing' },
                ],
                remember: {
                    params: {
                        label: 'test',
                    },
                },
            },
        }
        expect(getRememberList(state)).toEqual([{ id: 3, status: 0, label: 'testing' }])
    })

    describe('getRememberCurrentCard()', () => {
        it('Should return current card to remember', () => {
            const state = {
                card: {
                    list: [{ id: 2, text: 'Some', translate: 'Another' }],
                    remember: {
                        list: [1, 2, 3],
                        currentCardIndex: 1,
                    },
                },
            }
            expect(getRememberCurrentCard(state)).toEqual({
                id: 2,
                text: 'Some',
                translate: 'Another',
            })
        })

        it('Should return empty object', () => {
            const state = {
                card: {
                    list: [{ id: 2, text: 'Some', translate: 'Another' }],
                    remember: {
                        list: [1, 2, 3],
                        currentCardIndex: 0,
                    },
                },
            }
            expect(getRememberCurrentCard(state)).toEqual({})
        })
    })

    describe('isLastRememberCard()', () => {
        it('Should return true', () => {
            const state = {
                card: {
                    remember: {
                        list: [1, 2, 3],
                        currentCardIndex: 2,
                        step: 2,
                    },
                },
            }
            expect(isLastRememberCard(state)).toBe(true)
        })

        it('Should return false', () => {
            const state = {
                card: {
                    remember: {
                        list: [1, 2, 3],
                        currentCardIndex: 2,
                        step: 1,
                    },
                },
            }
            expect(isLastRememberCard(state)).toBe(false)
        })

        it('Should return false', () => {
            const state = {
                card: {
                    remember: {
                        list: [1, 2, 3],
                        currentCardIndex: 1,
                        step: 2,
                    },
                },
            }
            expect(isLastRememberCard(state)).toBe(false)
        })
    })

    describe('getNextNewId()', () => {
        it('Should return next new id', () => {
            const state = {
                card: {
                    list: [{ id: 1 }],
                },
            }
            expect(getNextNewId(state)).toBe(minNewId)
        })

        it('Should return next new id', () => {
            const state = {
                card: {
                    list: [{ id: minNewId }],
                },
            }
            expect(getNextNewId(state)).toBe(minNewId + 1)
        })
    })

    describe('getLatestLabel()', () => {
        it('Should return empty string for empty list', () => {
            const state = {
                card: {
                    list: [],
                },
            }
            expect(getLatestLabel(state)).toBe('')
        })

        it('Should return empty string for the list without label', () => {
            const state = {
                card: {
                    list: [{ id: 1 }],
                },
            }
            expect(getLatestLabel(state)).toBe('')
        })

        it('Should return latest label', () => {
            const state = {
                card: {
                    list: [{ id: 2, label: 'second' }, { id: 1, label: 'first' }],
                },
            }
            expect(getLatestLabel(state)).toBe('second')
        })
    })

    describe('getCardTotal()', () => {
        it('Should return number of cards', () => {
            const state = {
                card: {
                    list: [{ id: 1 }, { id: 2 }],
                },
            }
            expect(getCardTotal(state)).toBe(2)
        })
    })

    describe('getWriteCurrentCard()', () => {
        it('Should return current card to write', () => {
            const state = {
                card: {
                    list: [{ id: 2, text: 'Some', translate: 'Another' }],
                    write: {
                        list: [1, 2, 3],
                        currentCardIndex: 1,
                    },
                },
            }
            expect(getWriteCurrentCard(state)).toEqual({
                id: 2,
                text: 'Some',
                translate: 'Another',
            })
        })

        it('Should return empty object', () => {
            const state = {
                card: {
                    list: [{ id: 2, text: 'Some', translate: 'Another' }],
                    write: {
                        list: [1, 2, 3],
                        currentCardIndex: 0,
                    },
                },
            }
            expect(getWriteCurrentCard(state)).toEqual({})
        })
    })

    it('Should return next write card sounds', () => {
        const state = {
            card: {
                list: [
                    { id: 1, status: 1 },
                    { id: 2, status: 1, usSoundFile: '1.mp3', ruSoundFile: '2.mp3' },
                ],
                write: {
                    list: [1, 2],
                    currentCardIndex: 0,
                },
            },
        }
        expect(getNextWriteCardSounds(state)).toEqual(['1.mp3'])
    })

    describe('isLastWriteCard()', () => {
        it('Should return false', () => {
            const state = {
                card: {
                    write: {
                        list: [1, 2, 3],
                        currentCardIndex: 1,
                    },
                },
            }
            expect(isLastWriteCard(state)).toBe(false)
        })

        it('Should return true', () => {
            const state = {
                card: {
                    write: {
                        list: [1, 2, 3],
                        currentCardIndex: 2,
                    },
                },
            }
            expect(isLastWriteCard(state)).toBe(true)
        })
    })

    describe('getWriteErrorsTotal()', () => {
        it('Should return errors', () => {
            const state = {
                card: {
                    list: [
                        { id: 1, writeRightAttempts: 0 },
                        { id: 2, writeRightAttempts: 1 },
                        { id: 3, writeRightAttempts: 2 },
                    ],
                    write: {
                        list: [1, 2, 3],
                        currentCardIndex: 1,
                    },
                },
            }
            expect(getWriteErrorsTotal(state)).toBe(1)
        })

        it('Should return one error', () => {
            const state = {
                card: {
                    list: [{ id: 1, writeRightAttempts: 0 }],
                    write: {
                        list: [1],
                        currentCardIndex: 0,
                    },
                },
            }
            expect(getWriteErrorsTotal(state)).toBe(1)
        })
    })

    describe('getCurrentWriteCard()', () => {
        it('Should return errors', () => {
            const state = {
                card: {
                    list: [{ id: 1, writeRightAttempts: 0 }],
                    write: {
                        list: [1],
                        currentCardIndex: 0,
                    },
                },
            }
            expect(getCurrentWriteCard(state)).toEqual({ id: 1, writeRightAttempts: 0 })
        })
    })
})
