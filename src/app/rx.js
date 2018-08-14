
// Public API for the redux store.

// Pieces of state to retrieve, used with rx.get().
// Usage:  rx.get(<state-bit>)
// Where <state-bit> is one of the below.
// Example:  rx.get('layout.name')
const statePieces =  [ // eslint-disable-line
    'doNotTrack',
    'upload',
    'upload.formatShow',
    'upload.table.order',
    'upload.file',
]

// Actions on state. used with rx.set().
// Usage:  rx.set(<action>, <opts>)
// Where <action> is one of the below, <opts> are defined in rxInternal.js.
// Example:  rx.set('layout.nameSelected', { name: 'RPPA' })
// Actions ending with 'loadPersist' are written to localStore and bookmarks.
export const stateActions = [
    'doNotTrack.displayed',
    'doNotTrack.loadPersist',
    'upload.file.add',
    'upload.file.cancel',
    'upload.file.delete',
    'upload.file.rename',
    'upload.file.selected',
    'upload.formatShow.toggle',
    'upload.table.order.property',
]

// The global redux state.
let reduxStore = null

// Functions to access the redux state.
export const get = (statePiece) => {

    // Retrieve the state of one piece of state.
    // @param statePiece: one of the items tracked in redux state
    // @returns: the current state of the piece of state
    // usage example:  rx.get('layout.name')
    return reduxStore.getState()[statePiece]
}

export const getState = () => {

    // Retrieve the entire state tree.
    return reduxStore.getState()
}

export const set = (stateAction, optsIn) => {

    // Set the state using an state action type.
    // @param stateAction: the action type required for any operation
    // @param optsIn: object containing options specific to a redux action,
    //                optional depending on the action
    // @returns: the new state tree
    // usage example:  rx.set('layout.nameSelected', { name: 'RPPA' })
    let opts = optsIn  || {}
    opts.type = stateAction
    return reduxStore.dispatch(opts)
}

export const dispatch = (stateAction) => {

    // Dispatch an action.
    return reduxStore.dispatch(stateAction)
}

export const subscribe = (callback) => {

    // Subscribe to state changes to call back upon change.
    // @param callback: a function to call when the state changes
    // @returns: a function to unsubscribe from state changes.
    return reduxStore.subscribe(callback)
}

export function isArrayEqual(a1, a2) {

    // Performs a compare between two arrays of strings or arrays of simple
    // values; arrays may not contain objects.
    // Arrays with the same elements but different order are unequal.
    // Null and undefined are considered equal.
    if (!a2 && !a1) {
        return true
    }
    let is = true
    if (a2 && a1 &&
        typeof a1 === 'object' && typeof a2 === 'object' &&
        a1.length === a2.length) {
        for (let i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i]) {
                is = false
                break
            }
        }
    } else {
        is = false
    }
    return is
}

export function copyStringArray(orig) {

    // Make a deep copy of an array of strings.
    return orig.map(str => str.slice())
}

export const init = (store) => {
    reduxStore = store
}
