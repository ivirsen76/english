/* global describe, it, expect */
import reducer, { initialState, setToken, discardToken, setUser, restoreState } from './auth'

describe('auth reducer', () => {
    describe('setToken()', () => {
        it('Should set token', () => {
            const token = 'sjdfklsdjklfjlsd'
            expect(reducer(initialState, setToken(token)).token).toBe(token)
        })
    })

    describe('discardToken()', () => {
        it('Should discard token', () => {
            const state = {
                ...initialState,
                token: 'sjfdlkdsf',
                user: {
                    email: 'some@one.com',
                },
            }
            const resultedState = reducer(state, discardToken())
            expect(resultedState.token).toBeNull()
            expect(resultedState.user).toEqual({})
        })
    })

    describe('setUser()', () => {
        it('Should set user', () => {
            const state = {
                ...initialState,
                user: {},
            }
            const user = {
                email: 'some@one.com',
                info: 'dfkfdl',
            }
            const resultedState = reducer(state, setUser(user))
            expect(resultedState.user).toEqual({ email: 'some@one.com' })
        })
    })

    describe('restoreState()', () => {
        it('Should restore state', () => {
            const state = {
                ...initialState,
                user: {},
            }
            const savedState = {
                user: {
                    email: 'some@one.com',
                },
            }
            const resultedState = reducer(state, restoreState(savedState))
            expect(resultedState.user).toEqual({ email: 'some@one.com' })
        })
    })
})
