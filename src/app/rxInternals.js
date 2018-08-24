

// Redux implementation.

//import redux from 'redux'
import { createStore, combineReducers } from 'redux'
import { init as rxInit, stateActions as rxStateActions } from 'app/rx'

const reducers = {

    'createMap.attrShow': (state = true, action) => {
        if (action.type === 'createMap.attrShow.toggle') {
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
    'upload.table.order': (state = {property: 'name', direction: 'asc'},
        action) => {
        
        let next = {...state}
        switch(action.type) {
        case 'upload.table.order.property':

            // If the property is the same, just change the direction.
            if (state.property === action.property) {
                if (state.direction === 'desc') {
                    next.direction = 'asc'
                } else {
                    next.direction = 'desc'
                }
            } else {
            
                // With the property changed, reset the direction to descending.
                next.property = action.property
                next.direction = 'asc'
            }
            
            //console.log('upload.table.order, state, action, next:', state, action, next)
        
            return next
        default:
            return state
        }
    },
    'user': (state = 'swat_soe.ucsc.edu', action) => {
        switch(action.type) {
        case 'user.login':
            return action.user
        case 'user.logout':
            return null
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

    // Create an action with ID for each leaf node of state.
    rxStateActions.forEach(id => {
        makeAction(id)
    })
}

export const init = () => {
    
    // Create the redux actions.
    makeStateActions()
    
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
