import reducer, {
    initialState,
    addCardWithoutSaving as addCard,
    deleteCardWithoutSaving as deleteCard,
    updateCardWithoutSaving as updateCard,
    updateCardData,
    minNewId,
    setCards,
    setRememberCardsWithOrder as setRememberCards,
    resetRememberCards,
    setLoadingCardsState,
    goNextRememberCard,
    updateRememberParams,
    rememberCardWithoutSaving as rememberCard,
    toggleRememberPlayMode,
    toggleRememberSound,
    switchRememberOrder,
    updateRememberLabel,
    setWriteCards,
    goNextWriteCardInSet as goNextWriteCard,
    updateWriteInput,
    saveWriteResults,
} from './card'

describe('card reducer', () => {
    describe('updateRememberLabel()', () => {
        it('Should update remember label', () => {
            const state = {
                remember: {
                    params: {
                        label: '',
                    },
                    currentCardIndex: 1,
                    step: 2,
                },
            }

            expect(reducer(state, updateRememberLabel('new')).remember.params.label).toBe('new')
            expect(reducer(state, updateRememberLabel('new')).remember.currentCardIndex).toBe(0)
            expect(reducer(state, updateRememberLabel('new')).remember.step).toBe(1)
        })
    })

    describe('toggleRememberPlayMode()', () => {
        it('Should toggle play mode', () => {
            const state = {
                remember: {
                    params: {
                        isAutoPlayMode: false,
                    },
                },
            }

            expect(reducer(state, toggleRememberPlayMode()).remember.params.isAutoPlayMode).toBe(
                true
            )
        })
    })

    describe('switchRememberOrder()', () => {
        it('Should switch order', () => {
            const state = {
                remember: {
                    params: {
                        isEnFirst: true,
                    },
                    step: 2,
                },
            }

            expect(reducer(state, switchRememberOrder()).remember.params.isEnFirst).toBe(false)
            expect(reducer(state, switchRememberOrder()).remember.step).toBe(1)
        })
    })

    describe('toggleRememberSound()', () => {
        it('Should toggle sound', () => {
            const state = {
                remember: {
                    params: {
                        isEnSound: false,
                        isRuSound: false,
                    },
                },
            }

            expect(reducer(state, toggleRememberSound('us')).remember.params).toEqual({
                isEnSound: true,
                isRuSound: false,
            })
            expect(reducer(state, toggleRememberSound('uk')).remember.params).toEqual({
                isEnSound: true,
                isRuSound: false,
            })
            expect(reducer(state, toggleRememberSound('ru')).remember.params).toEqual({
                isEnSound: false,
                isRuSound: true,
            })
        })

        it('Should ignore unknow language', () => {
            const state = {
                remember: {
                    params: {
                        isEnSound: false,
                        isRuSound: false,
                    },
                },
            }

            expect(reducer(state, toggleRememberSound('bul'))).toBe(state)
        })
    })

    describe('rememberCard()', () => {
        it('Should remember one card', () => {
            const state = {
                list: [{ id: 1, text: 'Some', status: 0 }, { id: 2, text: 'Another', status: 0 }],
                remember: {
                    list: [1, 2],
                    step: 2,
                    currentCardIndex: 0,
                },
            }
            const resultedState = reducer(state, rememberCard(1))
            expect(resultedState.list[0].status).toBe(1)
            expect(resultedState.remember.list).toEqual([2])
            expect(resultedState.remember.step).toBe(1)
            expect(resultedState.remember.currentCardIndex).toBe(0)
        })

        it('Should remember the last card and move pointer to the first', () => {
            const state = {
                list: [{ id: 1, text: 'Some', status: 0 }, { id: 2, text: 'Another', status: 0 }],
                remember: {
                    list: [1, 2],
                    currentCardIndex: 1,
                },
            }
            const resultedState = reducer(state, rememberCard(2))
            expect(resultedState.remember.currentCardIndex).toBe(0)
        })

        it('Should ignore already remembered card', () => {
            const state = {
                list: [{ id: 1, text: 'Some', status: 1 }],
                remember: {
                    list: [1],
                },
            }
            expect(reducer(state, rememberCard(1))).toBe(state)
        })
    })

    describe('updateRememberParams()', () => {
        it('Should update only one param', () => {
            const state = {
                remember: {
                    params: {
                        isEnFirst: true,
                        isAutoPlayMode: false,
                        isEnSound: true,
                        isRuSound: false,
                        label: '',
                    },
                },
            }
            const expectedParams = {
                isEnFirst: true,
                isAutoPlayMode: false,
                isEnSound: false,
                isRuSound: false,
                label: '',
            }
            expect(
                reducer(state, updateRememberParams({ isEnSound: false })).remember.params
            ).toEqual(expectedParams)
        })

        it('Should ignore non-acceptable params', () => {
            const state = {
                remember: {
                    params: {
                        isEnFirst: true,
                        isAutoPlayMode: false,
                        isEnSound: true,
                        isRuSound: false,
                        label: '',
                    },
                },
            }
            expect(reducer(state, updateRememberParams({ badOne: false }))).toEqual(state)
        })
    })

    describe('setLoadingCardsState()', () => {
        it('Should set loading cards state', () => {
            const state = {
                ...initialState,
                loading: false,
            }
            expect(reducer(state, setLoadingCardsState(true)).loading).toBe(true)
        })
    })

    describe('addCard()', () => {
        it('Should add first new card', () => {
            const state = {
                ...initialState,
                list: [],
            }
            const expectedList = [{ id: minNewId, text: 'Tree', translate: 'Some', label: 'bla' }]
            const resultedState = reducer(
                state,
                addCard({ text: 'Tree', translate: 'Some', label: 'bla', unknown: 1 })
            )
            expect(resultedState.list).toEqual(expectedList)
        })

        it('Should add second new card', () => {
            const state = {
                ...initialState,
                list: [{ id: minNewId, text: 'Ball', translate: 'Some' }],
            }
            const expectedList = [
                { id: minNewId, text: 'Ball', translate: 'Some' },
                { id: minNewId + 1, text: 'Tree', translate: 'Some' },
            ]
            const resultedState = reducer(state, addCard({ text: 'Tree', translate: 'Some' }))
            expect(resultedState.list).toEqual(expectedList)
        })
    })

    describe('deleteCard()', () => {
        it('Should delete card and remove it from remember list', () => {
            const state = {
                ...initialState,
                list: [
                    { id: 1, text: 'Ball', translate: 'Some', status: 0 },
                    { id: 2, text: 'Tree', translate: 'Some', status: 0 },
                ],
                remember: {
                    list: [1, 2],
                    step: 2,
                    currentCardIndex: 0,
                },
            }
            const expectedList = [{ id: 2, text: 'Tree', translate: 'Some', status: 0 }]
            const resultedState = reducer(state, deleteCard(1))
            expect(resultedState.list).toEqual(expectedList)
            expect(resultedState.remember.list).toEqual([2])
            expect(resultedState.remember.step).toBe(1)
            expect(resultedState.remember.currentCardIndex).toBe(0)
        })
    })

    describe('updateCard()', () => {
        it('Should update text in a card', () => {
            const state = {
                ...initialState,
                list: [
                    {
                        id: 1,
                        text: 'Ball',
                        translate: 'Some',
                        ukSoundFile: '1',
                        ukSoundLength: 100,
                        usSoundFile: '1',
                        usSoundLength: 100,
                        ruSoundFile: '1',
                        ruSoundLength: 100,
                    },
                    { id: 2, text: 'Tree', translate: 'Some' },
                ],
            }
            const expectedList = [
                {
                    id: 1,
                    text: 'One',
                    translate: 'Some',
                    ruSoundFile: '1',
                    ruSoundLength: 100,
                },
                { id: 2, text: 'Tree', translate: 'Some' },
            ]
            const resultedState = reducer(state, updateCard({ id: 1, text: 'One', unknown: 1 }))
            expect(resultedState.list).toEqual(expectedList)
        })

        it('Should update translate in a card', () => {
            const state = {
                ...initialState,
                list: [
                    {
                        id: 1,
                        text: 'Ball',
                        translate: 'Some',
                        ukSoundFile: '1',
                        ukSoundLength: 100,
                        usSoundFile: '1',
                        usSoundLength: 100,
                        ruSoundFile: '1',
                        ruSoundLength: 100,
                    },
                ],
            }
            const expectedList = [
                {
                    id: 1,
                    text: 'Ball',
                    translate: 'Another',
                    ukSoundFile: '1',
                    ukSoundLength: 100,
                    usSoundFile: '1',
                    usSoundLength: 100,
                },
            ]
            const resultedState = reducer(state, updateCard({ id: 1, translate: 'Another' }))
            expect(resultedState.list).toEqual(expectedList)
        })
    })

    describe('updateCardData()', () => {
        it('Should update card using text', () => {
            const state = {
                ...initialState,
                list: [{ id: 1000000000, text: 'Ball', translate: 'Some' }],
            }
            const expectedList = [
                {
                    id: 4,
                    text: 'Ball',
                    translate: 'Some',
                    ruSoundFile: '1',
                    ruSoundLength: 100,
                    usSoundFile: '1',
                    usSoundLength: 100,
                    ukSoundFile: '1',
                    ukSoundLength: 100,
                },
            ]
            const resultedState = reducer(
                state,
                updateCardData({
                    id: 4,
                    text: 'Ball',
                    translate: 'Some',
                    ruSoundFile: '1',
                    ruSoundLength: 100,
                    usSoundFile: '1',
                    usSoundLength: 100,
                    ukSoundFile: '1',
                    ukSoundLength: 100,
                })
            )
            expect(resultedState.list).toEqual(expectedList)
        })

        it('Should update the same card', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, text: 'Ball', translate: 'Some' }],
            }
            const expectedList = [{ id: 1, text: 'Ball', translate: 'Another' }]
            const resultedState = reducer(
                state,
                updateCardData({
                    id: 1,
                    text: 'Ball',
                    translate: 'Another',
                })
            )
            expect(resultedState.list).toEqual(expectedList)
        })

        it('Should not update card', () => {
            const state = {
                ...initialState,
                list: [{ id: 3, text: 'Ball', translate: 'Some' }],
            }
            const expectedList = [{ id: 3, text: 'Ball', translate: 'Some' }]
            const resultedState = reducer(
                state,
                updateCardData({
                    id: 4,
                    text: 'Ball',
                    translate: 'Some',
                    ruSoundFile: '1',
                    ruSoundLength: 100,
                })
            )
            expect(resultedState.list).toEqual(expectedList)
        })
    })

    describe('setCards()', () => {
        it('Should add cards', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, text: 'Ball', translate: 'Some', label: '1' }],
            }
            const expectedList = [
                { id: 3, text: 'One', translate: 'Some', label: '123', status: 1 },
                {
                    id: 4,
                    text: 'Tree',
                    translate: 'Some',
                    label: '456',
                    ruSoundFile: '1',
                    ruSoundLength: 100,
                    usSoundFile: '1',
                    usSoundLength: 100,
                    ukSoundFile: '1',
                    ukSoundLength: 100,
                    status: 0,
                    createdAt: '2017-05-12 19:31:05',
                },
            ]
            const resultedState = reducer(
                state,
                setCards([
                    { id: 3, text: 'One', translate: 'Some', label: '123', another: 33, status: 1 },
                    {
                        id: 4,
                        text: 'Tree',
                        translate: 'Some',
                        label: '456',
                        ruSoundFile: '1',
                        ruSoundLength: 100,
                        usSoundFile: '1',
                        usSoundLength: 100,
                        ukSoundFile: '1',
                        ukSoundLength: 100,
                        some: 55,
                        status: 0,
                        createdAt: '2017-05-12 19:31:05',
                    },
                ])
            )
            expect(resultedState.list).toEqual(expectedList)
        })
    })

    describe('setRememberCards()', () => {
        it('Should set list of cards', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, status: 0 }, { id: 2, status: 1 }, { id: 3, status: 0 }],
                remember: {
                    ...initialState.remember,
                    iteration: 0,
                    currentCardIndex: 1,
                    step: 2,
                },
            }
            const resultedState = reducer(state, setRememberCards())
            expect(resultedState.remember.list).toEqual([1, 3])
            expect(resultedState.remember.currentCardIndex).toBe(0)
            expect(resultedState.remember.step).toBe(1)
            expect(resultedState.remember.iteration).toBe(1)
        })

        it('Should set list of cards with order', () => {
            const state = {
                ...initialState,
                list: [{ id: 11, status: 0 }, { id: 22, status: 1 }, { id: 33, status: 0 }],
            }
            const resultedState = reducer(state, setRememberCards([2, 1, 0]))
            expect(resultedState.remember.list).toEqual([33, 11])
        })
    })

    describe('resetRememberCards()', () => {
        it('Should reset card list', () => {
            const state = {
                ...initialState,
                remember: {
                    ...initialState.remember,
                    list: [1, 3],
                    currentCardIndex: 1,
                    step: 2,
                    iteration: 34,
                },
            }
            const resultedState = reducer(state, resetRememberCards())
            expect(resultedState.remember.list).toEqual([])
            expect(resultedState.remember.currentCardIndex).toBe(0)
            expect(resultedState.remember.step).toBe(1)
            expect(resultedState.remember.iteration).toBe(0)
        })
    })

    describe('goNextRememberCard()', () => {
        it('Should go to the next step', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, status: 0 }, { id: 2, status: 0 }, { id: 3, status: 0 }],
                remember: {
                    ...initialState.remember,
                    list: [1, 2, 3],
                    step: 1,
                    currentCardIndex: 0,
                },
            }
            const resultedState = reducer(state, goNextRememberCard())
            expect(resultedState.remember.step).toBe(2)
            expect(resultedState.remember.currentCardIndex).toBe(0)
        })

        it('Should go to the next card', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, status: 0 }, { id: 2, status: 0 }, { id: 3, status: 0 }],
                remember: {
                    ...initialState.remember,
                    list: [1, 2, 3],
                    step: 2,
                    currentCardIndex: 0,
                },
            }
            const resultedState = reducer(state, goNextRememberCard())
            expect(resultedState.remember.step).toBe(1)
            expect(resultedState.remember.currentCardIndex).toBe(1)
        })

        it('Should go back to the first card', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, status: 0 }, { id: 2, status: 0 }, { id: 3, status: 0 }],
                remember: {
                    ...initialState.remember,
                    list: [1, 2, 3],
                    step: 2,
                    currentCardIndex: 2,
                },
            }
            const resultedState = reducer(state, goNextRememberCard())
            expect(resultedState.remember.step).toBe(1)
            expect(resultedState.remember.currentCardIndex).toBe(0)
        })
    })

    describe('setWriteCards()', () => {
        it('Should set list of cards', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, status: 1 }, { id: 2, status: 0 }, { id: 3, status: 1 }],
                write: {
                    ...initialState.write,
                    iteration: 0,
                    input: 'some',
                    currentCardIndex: 1,
                    isChecked: true,
                },
            }
            const resultedState = reducer(state, setWriteCards())
            expect(resultedState.write.list).toEqual([1, 3])
            expect(resultedState.write.input).toEqual('')
            expect(resultedState.write.currentCardIndex).toBe(0)
            expect(resultedState.write.isChecked).toBe(false)
            expect(resultedState.write.iteration).toBe(1)
        })

        it('Respect card limit', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, status: 1 }, { id: 2, status: 0 }, { id: 3, status: 1 }],
                write: {
                    ...initialState.write,
                    limit: 1,
                },
            }
            const resultedState = reducer(state, setWriteCards())
            expect(resultedState.write.list).toEqual([1])
        })
    })

    describe('goNextWriteCard()', () => {
        it('Should go to the next step', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, status: 1 }, { id: 2, status: 1 }, { id: 3, status: 1 }],
                write: {
                    ...initialState.write,
                    list: [1, 2, 3],
                    input: 'some',
                    currentCardIndex: 0,
                    isChecked: true,
                },
            }
            const resultedState = reducer(state, goNextWriteCard())
            expect(resultedState.write.currentCardIndex).toBe(1)
            expect(resultedState.write.isChecked).toBe(false)
            expect(resultedState.write.input).toEqual('')
        })

        it('Should ignore next step if it is not checked', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, status: 1 }, { id: 2, status: 1 }, { id: 3, status: 1 }],
                write: {
                    ...initialState.write,
                    list: [1, 2, 3],
                    isChecked: false,
                },
            }
            expect(reducer(state, goNextWriteCard())).toBe(state)
        })
    })

    describe('updateWriteInput()', () => {
        it('Should update input', () => {
            const state = {
                ...initialState,
                write: {
                    ...initialState.write,
                    input: 'som',
                },
            }
            const resultedState = reducer(state, updateWriteInput('some'))
            expect(resultedState.write.input).toBe('some')
        })
    })

    describe('saveWriteResults()', () => {
        it('Should save write result for the right word', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, text: 'some', writeRightAttempts: 1 }],
                write: {
                    ...initialState.write,
                    list: [1],
                    input: 'Some',
                    currentCardIndex: 0,
                    isChecked: false,
                },
            }
            const resultedState = reducer(state, saveWriteResults())
            expect(resultedState.list).toEqual([{ id: 1, text: 'some', writeRightAttempts: 2 }])
            expect(resultedState.write.isChecked).toBe(true)
        })

        it('Should save write result for the right word and change status', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, text: 'some', status: 1, writeRightAttempts: 2 }],
                write: {
                    ...initialState.write,
                    list: [1],
                    input: 'Some',
                    currentCardIndex: 0,
                },
            }
            const resultedState = reducer(state, saveWriteResults())
            expect(resultedState.list).toEqual([
                { id: 1, text: 'some', status: 2, writeRightAttempts: 3 },
            ])
        })

        it('Should reset write results for the wrong word', () => {
            const state = {
                ...initialState,
                list: [{ id: 1, text: 'some', status: 1, writeRightAttempts: 2 }],
                write: {
                    ...initialState.write,
                    list: [1],
                    input: 'wrong',
                    currentCardIndex: 0,
                },
            }
            const resultedState = reducer(state, saveWriteResults())
            expect(resultedState.list).toEqual([
                { id: 1, text: 'some', status: 1, writeRightAttempts: 0 },
            ])
        })
    })
})
