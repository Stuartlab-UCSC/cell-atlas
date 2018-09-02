

// Redux implementation.

//import redux from 'redux'
import { createStore, combineReducers } from 'redux'
import rx from 'app/rx'
import resultState from 'result/resultState'
import uploadState from 'upload/uploadState'

const reducers = {

    'createMap.metadataShow': (state = true, action) => {
        if (action.type === 'createMap.metadataShow.toggle') {
            return !state
        } else {
            return state
        }
    },
    'createMap.featureShow': (state = true, action) => {
        if (action.type === 'createMap.featureShow.toggle') {
            return !state
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
    'navBar': (state = 'cellAtlasHome', action) => {
        switch(action.type) {
        case 'navBar.select':
            return action.selected
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
    Object.assign(reducers, resultState)
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
