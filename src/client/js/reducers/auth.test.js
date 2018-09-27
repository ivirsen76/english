import reducer, { initialState, setUser, unsetUser } from './auth'

describe('auth reducer', () => {
    describe('unsetUser()', () => {
        it('Should unset user', () => {
            const state = {
                ...initialState,
                user: {
                    email: 'some@one.com',
                },
            }
            const resultedState = reducer(state, unsetUser())
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
                roles: 'admin',
                info: 'dfkfdl',
            }
            const resultedState = reducer(state, setUser(user))
            expect(resultedState.user).toEqual({ email: 'some@one.com', roles: 'admin' })
        })
    })
})
