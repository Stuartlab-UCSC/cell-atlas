
// Global authentication/authorization (auth) state.
const defaultRedirectPage = '/'
const defaultUser = {
    name: null,
    roles: [],
}

const auth = (
    state = {
        checkMail: false,  // message telling user to check their email
        redirectPage: defaultRedirectPage,
        user: defaultUser,
    }, action) => {
        switch(action.type) {
        case 'auth.checkMail.now':
            return {
                ...state,
                checkMail: true
            }
        case 'auth.checkMail.reset':
            return {
                ...state,
                checkMail: false
            }
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
