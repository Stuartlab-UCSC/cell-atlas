

// Redux implementation.

import { createStore, combineReducers } from 'redux'
import rx from 'state/rx'
import cellType from 'cellType/state'
import database from 'database/databaseState'
import dataset from 'dataset/datasetState'
import gene from 'gene/state'
import { namerDialogState as namerDialog } from 'components/NamerDialog'

// Global application state.
const app = (
    state = {
        homeRedirect: false,
        navBarTheme: 'light',
        userEmail: null,
    }, action) => {
        switch(action.type) {
        case 'homeRedirect.set':
            return {
                ...state,
                homeRedirect: true
            }
        case 'homeRedirect.reset':
            return {
                ...state,
                homeRedirect: false
            }
        case 'userEmail.login':
            if (action.user) {
                return {
                    ...state,
                    userEmail: action.user
                }
            }
            return {
                ...state,
                userEmail: null
            }
        case 'userEmail.logout':
            return {
                ...state,
                userEmail: null
            }
        default:
            return state
        }
    }

export const init = () => {
    const Reducers = combineReducers({
        app,
        cellType,
        database,
        dataset,
        gene,
        namerDialog,
    })

    // Create the store.
    let store
    if (process.env.CELLDEV) {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
        store = createStore(
            Reducers, /* preloadedState, */
            composeEnhancers()
        )
    } else {
        store = createStore(
            Reducers, /* preloadedState, */
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    }
    rx(store)
    return store
    /* eslint-enable */
}
