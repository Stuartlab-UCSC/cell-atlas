
// Global authentication/authorization (auth) state.
const defaultUser = { name: null, token: null }

const auth = (
    state = {
        user: defaultUser,
    }, action) => {
        switch(action.type) {
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
                    token: action.token,
                }
            }
        case 'auth.user.logout':
            return {
                ...state,
                user: { name: null, token: null }
            }
         default:
            return state
        }
    }

export default auth
export { defaultUser }
