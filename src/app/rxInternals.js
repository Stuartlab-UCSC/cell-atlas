

// Redux implementation.

//import redux from 'redux'
import { createStore, combineReducers } from 'redux'
import rx from 'app/rx'
import { stateActions as rxStateActions } from 'app/rx'

const tableOrderPosition = (action, state) => {
    let next = {...state}
    next.positionRowId = action.positionRowId
    next.position = action.position
    return next
}

const tableOrderColumn = (action, state) => {
    let next = {...state}
    
    // Reset any stored row position.
    delete next.position
    delete next.positionRowId
    
    // If the previous state was not sorted on anything,
    // set the column and reset the direction.
    if (state.column === 'none') {
        next.column = action.column
        next.direction = state.defaltDir
        
    // If the column is the same, change direction.
    } else if (state.column === action.column) {
        next.direction =
            (state.direction === 'desc') ? 'asc' : 'desc'
    
    // The column changed so reset the direction.
    } else {
        next.column = action.column
        next.direction = state.defaltDir
    }
    return next
}

const tableOrderPositionReset = (state) => {
    if (state.position) {
        let next = {...state}
        delete next.position
        delete next.positionRowId
        return next
    } else {
        return state
    }
}


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
    'result.order': (state = {column: 'status', direction: 'desc',
        defaltDir: 'desc'}, action) => {
        
        let next
        switch(action.type) {
        case 'result.order.position':
            next = tableOrderPosition(action, state)
            return next
        case 'result.order.column':
            next = tableOrderColumn(action, state)
            return next
        case 'result.order.positionReset':
            next = tableOrderPositionReset(state)
            return next
        default:
            return state
        }
    },
    'result.parmShow': (state = {}, action) => {
        let next = {...state}
        switch(action.type) {
        case 'result.parmShow.toggle':
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
    'upload.fileList': (state =[], action) => {
        switch(action.type) {
        case 'upload.fileList.selected':
            return action.fileList
        default:
            return state
        }
    },
    'upload.formatShow': (state = {}, action) => {
        let next
        switch(action.type) {
        case 'upload.formatShow.toggle':
            next = {...state}
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
    'upload.idSeq': (state = '5', action) => { // TODO set to 1 later
        if (action.type === 'upload.idSeq.assign') {
            return (parseInt(state, 10) + 1).toString()
        } else {
            return state
        }
    },
    'upload.order': (state = {column: 'status', direction: 'desc',
        defaltDir: 'desc'}, action) => {
        
        let next
        switch(action.type) {
        case 'upload.order.position':
            next = tableOrderPosition(action, state)
            return next
        case 'upload.order.column':
            next = tableOrderColumn(action, state)
            return next
        case 'upload.order.positionReset':
            next = tableOrderPositionReset(state)
            return next
        default:
            return state
        }
    },
    'upload.table': (state = {
            1: {
                id: 1,
                name: 'myBadData.tsv',
                size: 149.3,
                status: 'Error'
            },
            2: {
                id: 2,
                name: 'myCanceledUpload.tsv',
                size: 201.9,
                status: 'Canceled'
            },
            3: {
                id: 3,
                name: 'ExampleMetadata.tab',
                size: 446.2,
                format: 'metadata',
                status: '08/02/2018'
            },
            4: {
                id: 4,
                name: 'ExampleFeature.tab',
                size: 964.2,
                format: 'featureMatrix',
                status: '08/01/2018'
            },

        }, action) => {
        
        let next
        switch(action.type) {
        case 'upload.table.cancel':
            next = {...state}
            next[action.id].status = 'Canceled'
            return next
        case 'upload.table.delete':
            next = {...state}
            delete next[action.id]
            return next
        case 'upload.table.download':
        case 'upload.table.load':
            return action.tableData
        case 'upload.table.uploading':
            next = {...state}
            next[action.id] = action.data
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
    rx(store)
    return store
    /* eslint-enable */
}

//export default init
