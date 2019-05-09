
// Global authentication/authorization (auth) state.
const defaultRedirectPage = '/'
const defaultUser = {
    name: null,
    roles: null,
}

const auth = (
    state = {
        redirectPage: defaultRedirectPage,
        user: defaultUser,
    }, action) => {
        switch(action.type) {
        case 'auth.redirectPage.set':
            return {
                ...state,
                redirectPage: action.value
            }
        case 'auth.redirectPage.loadPersist':
            return {
                ...state,
                redirectPage: action.value
            }
        case 'auth.user.loadPersist':
            return {
                ...state,
                user: action.value
            }
        case 'auth.user.login':
            return {
                ...state,
                user: {
                    name: action.username,
                    roles: action.roles,
                }
            }
        case 'auth.user.logout':
            return {
                ...state,
                user: defaultUser
            }
         default:
            return state
        }
    }

export default auth
export { defaultUser }
