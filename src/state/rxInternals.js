

// Redux implementation.

import { createStore, combineReducers } from 'redux'
import rx from 'state/rx'
import auth from 'auth/state'
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
        homeAboutOpen: false,
        homeRedirect: false,
        homeUrlSearch: null,
        navBarActive: window.location.pathname,
        navBarTheme: 'light',
    }, action) => {
        switch(action.type) {
        case 'app.homeAboutOpen.toggle':
            return {
                ...state,
                homeAboutOpen: !state.homeAboutOpen
            }
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
        case 'app.homeUrlSearch.clear':
            return {
                ...state,
                homeUrlSearch: null
            }
        case 'app.homeUrlSearch.set':
            return {
                ...state,
                homeUrlSearch: action.value
            }
        case 'app.navBarActive.anyClick':
        case 'app.navBarActive.topLevelClick':
            return {
                ...state,
                navBarActive: window.location.pathname
            }
        case 'app.navBarActive.homeToGene':
            return {
                ...state,
                navBarActive: '/gene'
            }
        default:
            return state
        }
    }

export const init = () => {
    const Reducers = combineReducers({
        app,
        auth,
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
