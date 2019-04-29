

// Redux implementation.

import { createStore, combineReducers } from 'redux'
import rx from 'state/rx'
import bubble from 'bubble/state'
import cellType from 'cellType/state'
import database from 'database/databaseState'
import dataset from 'dataset/datasetState'
import gene from 'gene/state'
import geneName from 'components/geneNameState'
import { namerDialogState as namerDialog } from 'components/NamerDialog'

// Global application state.
const app = (
    state = {
        homeRedirect: false,
        navBarActive: window.location.pathname,
        navBarTheme: 'light',
        userEmail: null,
    }, action) => {
        switch(action.type) {
        case 'app.homeRedirect.set':
            return {
                ...state,
                homeRedirect: true
            }
        case 'app.homeRedirect.reset':
            return {
                ...state,
                homeRedirect: false
            }
        case 'app.navBarActive.anyClick':
        case 'app.navBarActive.topLevelClick':
            console.log('state app.navBarActive.*Click: window.location.pathname:',
                window.location.pathname)
            return {
                ...state,
                navBarActive: window.location.pathname
            }
        case 'app.navBarActive.homeToGene':
            return {
                ...state,
                navBarActive: '/gene'
            }
        case 'app.userEmail.login':
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
        case 'app.userEmail.logout':
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
        bubble,
        cellType,
        database,
        dataset,
        gene,
        geneName,
        namerDialog,
    })

    // Create the store.
    let store
    if (process.env.REACT_APP_CELLDEV) {
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
