

// Redux implementation.

import { createStore, combineReducers } from 'redux'
import rx from 'state/rx'
import { aboutState } from 'home/About'
import cellTypeState from 'cellType/state'
import databaseState from 'database/databaseState'
import databaseFavoriteState from 'database/favoriteState'
import datasetState from 'dataset/datasetState'
import geneState from 'gene/state'
import moleSimState from 'moleSim/moleSimState'
import resultState from 'result/resultState'
import searchState from 'search/searchState'
import trajSimState from 'trajSim/trajSimState'
import typePsychState from 'typePsych/typePsychState'
import uploadState from 'upload/page/uploadState'

const reducers = {

    'background': (state = '#ffffff', action) => {
        if (action.type === 'background.toggle') {
            return (state === '#ffffff') ? '#000000' : '#ffffff'
        } else {
            return state
        }

    },
    'input.file': (state = null, action) => {
        if (action.type === 'input.file.update') {
            return action
        } else {
            return state
        }
    },
    'doNotTrack': (state = null, action) => {
        switch(action.type) {
        case 'doNotTrack.displayed':
            return 'displayed'
        case 'doNotTrack.loadPersist':
            return action.loadPersist
        default:
            return state
        }
    },
    'navBar.theme': (state = 'light', action) => {
        switch(action.type) {
            case 'navBar.theme.toggle':
                return (state === 'light') ? 'dark' : 'light'
         default:
            return state
        }
    },
    'home.redirect': (state = false, action) => {
        switch (action.type) {
            case 'home.redirect.set':
                return true
            case 'home.redirect.reset':
                return false
            default:
                return state
        }
    },
    'namerDialog.name': (state = null, action) => {
        switch(action.type) {
        case 'namerDialog.name.change':
            return action.value
        default:
            return state
        }
    },
    'namerDialog.message': (state = 'Name this', action) => {
        switch(action.type) {
        case 'namerDialog.message.uiSet':
            return action.value
        default:
            return state
        }
    },
    
    // The callback to handle the new name.
    'namerDialog.onSubmit': (state = null, action) => {
        switch(action.type) {
        case 'namerDialog.onSubmit.uiSet':
            return action.callback
        case 'namerDialog.onSubmit.clear':
            return null
        default:
            return state
        }
    },
    'namerDialog.open': (state = false, action) => {
        switch(action.type) {
        case 'namerDialog.open.true':
            return true
        case 'namerDialog.open.false':
            return false
        default:
            return state
        }
    },
    'user.email': (state = null, action) => {
        switch(action.type) {
        case 'user.email.login':
            if (action.user) {
                return action.user
            }
            return null
        case 'user.email.logout':
            return null
        default:
            return state
        }
    },
};

export const init = () => {
    
    // Create the redux actions.
    
    // Combine the other reducers with these local reducers.
    Object.assign(reducers, aboutState)
    Object.assign(reducers, cellTypeState)
    Object.assign(reducers, databaseState)
    Object.assign(reducers, databaseFavoriteState)
    Object.assign(reducers, datasetState)
    Object.assign(reducers, geneState)
    Object.assign(reducers, moleSimState)
    Object.assign(reducers, resultState)
    Object.assign(reducers, searchState)
    Object.assign(reducers, trajSimState)
    Object.assign(reducers, typePsychState)
    Object.assign(reducers, uploadState)

    // Create the store.
    let store
    if (process.env.CELLDEV) {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
        store = createStore(
            combineReducers(reducers), /* preloadedState, */
            composeEnhancers()
        )
    } else {
        store = createStore(
            combineReducers(reducers), /* preloadedState, */
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    }
    rx(store)
    return store
    /* eslint-enable */
}
