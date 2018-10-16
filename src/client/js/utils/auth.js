import axios from '@ieremeev/axios'
import cookie from 'js-cookie'
import _set from 'lodash/set'
import _unset from 'lodash/unset'
import _get from 'lodash/get'
import { resetState } from 'client/js/reducers/card.js'

export const logout = () => {
    cookie.remove('token')
    _unset(window, 'ieremeev.user')
    window.ieremeev.store.dispatch(resetState())
}

export const setCurrentUser = userData => {
    _set(window, 'ieremeev.user', userData)
}

export const setCurrentUserFromToken = async () => {
    try {
        const res = await axios.post('/auth/token')
        _set(window, 'ieremeev.user', res.data.data)
    } catch (e) {
        logout()
    }
}

export const login = async ({ email, password }) => {
    logout()

    try {
        const res = await axios.post('/auth/local', { email, password })
        const token = res.data.token
        const userData = res.data.data
        cookie.set('token', token)
        axios.setToken(token)
        setCurrentUser(userData)
    } catch (e) {
        throw { email: 'User or password are wrong' }
    }
}

export const getCurrentUser = () => _get(window, 'ieremeev.user')

export const isLoggedIn = () => !!getCurrentUser()

export const hasRole = role => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
        return false
    }

    return currentUser.roles === role
}
