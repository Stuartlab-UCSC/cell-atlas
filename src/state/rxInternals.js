

// Redux implementation.

import { createStore, combineReducers } from 'redux'
import rx from 'state/rx'
import { aboutState } from 'home/About'
import datasetState from 'dataset/datasetState'
import moleSimState from 'moleSim/moleSimState'
import resultState from 'result/resultState'
import searchState from 'search/searchState'
import trajSimState from 'trajSim/trajSimState'
import typePsychState from 'typePsych/typePsychState'
import uploadState from 'upload/page/uploadState'

const reducers = {

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
                console.log('home.redirect.set')
                return true
            case 'home.redirect.reset':
                console.log('home.redirect.reset')
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
    Object.assign(reducers, datasetState)
    Object.assign(reducers, moleSimState)
    Object.assign(reducers, resultState)
    Object.assign(reducers, searchState)
    Object.assign(reducers, trajSimState)
    Object.assign(reducers, typePsychState)
    Object.assign(reducers, uploadState)

    // Create the store.
    /* eslint-disable no-underscore-dangle */
    const store = createStore(
        combineReducers(reducers), /* preloadedState, */
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    rx(store)
    return store
    /* eslint-enable */
}

//export default init
