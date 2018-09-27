export const hasRole = role => {
    const store = window.ieremeev && window.ieremeev.store
    if (!store) {
        return false
    }

    const userRole = store.getState().app.auth.user.roles
    return userRole === role
}
