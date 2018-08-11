

// Redux implementation.

//import redux from 'redux'
import { createStore, combineReducers } from 'redux'
import { init as rxInit, stateActions as rxStateActions } from 'main/rx'

const reducers = {

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
    'upload': (state = null, action) => {
        switch(action.type) {
        case 'upload.selected':
            return action.files
        default:
            return state
        }
    },
    'upload.formatShow': (state = {}, action) => {
        let next = {...state}
        switch(action.type) {
        case 'upload.formatShow.toggle':
            if (state[action.id] === undefined) {
                next[action.id] = true
            } else {
                next[action.id] = !state[action.id]
            }
            return next
        default:
            return state
        }
    },
};

// Create one action.
function makeAction (type, ...argNames) {
    return function (...args) {
        let action = { type }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }
}

// Create all actions.
function makeStateActions () {

    // Create all action identifiers and actions for single action bits of state.
    rxStateActions.forEach(id => {
        makeAction(id)
    })
}

export const init = () => {
    
    // Create the redux actions.
    makeStateActions()
    /*
    // Combine the shortEntry reducers with these reducers.
    // TODO use nested reducers rather than a flat space.
    Object.assign(reducers, shortEntryState.getReducers())
    */
    
    // Create the store.
    /* eslint-disable no-underscore-dangle */
    const store = createStore(
        combineReducers(reducers), /* preloadedState, */
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    rxInit(store)
    return store
    /* eslint-enable */
}

//export default init
