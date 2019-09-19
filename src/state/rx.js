
// Public API for the redux store.

// The global redux state.
let reduxStore = null

export const getState = () => {
    // Retrieve the entire state tree.
    return reduxStore.getState()
}

export const get = (statePiece) => {
    // Retrieve the state of one piece of state.
    // @param statePiece: one of the state items as a dot-separated ID string
    // @returns: the current state of the piece of state
    // usage example:  rx.get('app.homeRedirect')
    // Transform the string ID into multi-level indices into state.
    const seg = statePiece.split('.')
    const len = seg.length
    const state = reduxStore.getState()
    switch (len) {
    case 2:
        return state[seg[0]][seg[1]]
    case 3:
        return state[seg[0]][seg[1]][seg[2]]
    case 4:
        return state[seg[0]][seg[1]][seg[2]][seg[3]]
    case 5:
        return state[seg[0]][seg[1]][seg[2]][seg[3]][seg[4]]
    case 6: // heaven forbid
        return state[seg[0]][seg[1]][seg[2]][seg[3]][seg[4]][seg[5]]
    default:
        console.error("I don't know how to process this many levels!")
        return undefined
    }
    //return reduxStore.getState()[seg[0]][seg[1]]
}

export const rxGet = (statePiece) => get(statePiece)

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

export const rxSet = (stateAction, optsIn) => set(stateAction, optsIn)

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

const init = (store) => {
    reduxStore = store
}

export default init
