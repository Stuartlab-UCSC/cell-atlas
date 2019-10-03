
// Redux implementation.

import { createStore, combineReducers } from 'redux'
import rx from 'state/rx'
import auth from 'auth/state'
import bubble from 'bubble/state'
import cellTypeBar from 'cellTypeBar/state'
import cellTypeCluster from 'cellTypeCluster/clusterState'
import { cellTypeGeneClusters, cellTypeGene, ctgVariable }
    from 'cellTypeGene/state'
import cellTypeScatter from 'cellTypeScatter/state'
import { cellTypeSheetState as cellTypeSheet } from  'cellTypeWork/state'
import cellTypeWork from 'cellTypeWork/state'
import database from 'database/databaseState'
import dataset from 'dataset/datasetState'
import gene from 'gene/state'
import geneName from 'components/geneNameState'
import { namerDialogState as namerDialog } from 'components/NamerDialog'
import { State as sortable } from 'app/sortable'
import { State as wish } from 'components/wish'

// Global application state.
const defaultSnackbar = {
    open: false,
    message: ' ',
}
const app = (
    state = {
        homeAboutOpen: false,
        homeRedirect: false,
        navBarActive: window.location.pathname,
        navBarTheme: 'light',
        snackbar: defaultSnackbar,
        wishOpen: false,
        wishText: '',
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
        case 'app.snackbar.close':
            return {
                ...state,
                snackbar: defaultSnackbar
            }
        case 'app.snackbar.open':
            // The action value may be a message string or an object
            // containing the message an options.
            let snackbar = { message: action.value, open: true }
            if (typeof action.value === 'object') {
                snackbar = { ...action.value, open: true }
            }
            return {
                ...state,
                snackbar
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
        cellTypeBar,
        cellTypeCluster,
        cellTypeGene,
        cellTypeGeneClusters,
        cellTypeScatter,
        cellTypeSheet,
        cellTypeWork,
        ctgVariable,
        database,
        dataset,
        gene,
        geneName,
        namerDialog,
        sortable,
        wish
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
