
// sessionStore.js
// An object to write and load state.
// in this context 'store' refers to the persistent session store,
// while 'state' refers to the redux state
// This saves state upon the beforeunload event.
// Alternatively, persistent pieces could be saved every time they change.
// Don't know which is less code at this point.

import { get as rxGet, set as rxSet } from 'state/rx'
import auth from 'auth/state'
import database from 'database/databaseState'

let LOGGING = false  // true means log the state and store on save and load
let storageSupported
let storeName

// The state pieces to save to session store, with their defaults.
// We don't save defaults to session store.
// To add a piece of state to session store, add a line below and provide
// a ...loadPersist state action.
const stateKeys = {
    'auth.user': auth.defaultUser,
    'database.query': database.defaultQuery,
    'database.favoriteList': database.defaultFavoriteList,
    'database.favoriteSelected': database.defaultFavoriteSelected,
}

// TODO: need routines to determine equality with default for a single-level
//       object and an array.
function isDefault (key, val) {
    return (rxGet(key) === stateKeys[key])
}

function logState (label, state) {

    // Log values as they are in state. Don't show default values.
    if (!LOGGING) {
        return
    }
    console.log(label, 'state...')

    for (const key of Object.keys(stateKeys)) {
        const val = rxGet(key)
        if (!isDefault(key, val)) {
            console.log(key, ':', val)
        }
    }
}

function logStore (label, store) {

    // Log values as they are in the session store.
    if (!LOGGING) {
        return
    }
    console.log(label, 'store...')
    for (const [key, val] of Object.entries(store)) {
        //if (key === 'activeMetadatas' || key === 'dynamicMetadatas') {
        console.log(key, ':', val)
        //}
    }
}

function localStore (oper, jsonStore) {
    if (oper === 'get') {
        return JSON.parse(window.localStorage.getItem(storeName))

    } else if (oper === 'set') {
        window.localStorage.setItem(storeName, jsonStore)
        
    } else if (oper === 'remove') {
        window.localStorage.removeItem(storeName)
        
    } else {
        console.log('bad operation for local store:', oper)
    }
}

function jsonStringify (store) {
    return JSON.stringify(store)
}

function specialState () {
    let query = rxGet('database.query')
    if (query === '') {
        // Fill the empty query with the favorite selected.
        query = rxGet('database.favoriteSelected')
        rxSet('database.query.loadPersistOverride', { value: query })
    }
    // Set the query row count.
    rxSet('database.queryRowCount.loadPersistOverride', { queryString: query })
}

function load (store, state) {
    
    if (!storageSupported) {
        return
    }

    logStore('\nLoad', store)

    // Walk through the saved session store loading anything we recognize.
    for (const [key, val] of Object.entries(store)) {
        rxSet(key + '.loadPersist', { value: val })
    }
    
    // Handle some special cases.
    specialState()
    
    // Log all persistent store state values.
    logState('Load')
}

const saveEach = function () {

    // Log all persistent store state values.
    logState('\nSave')

    // Save each persistent state value.
    let store = {}

    // Walk though our list of keys and save those that are not the default.
    for (const key in stateKeys) {
        const val = rxGet(key)

        // Only save non-defaults.
        if (!isDefault(key, val)) {
            store[key] = val
        }
    }
    
    logStore('Save', store)

    return jsonStringify(store)
}

function save () {

    // Save state by writing it to local browser store.
    localStore('remove')
    localStore('set', saveEach())
}

function checkLocalStore () {

    // Check to see if browser supports HTML5 Store
    // Any modern browser should pass.
    let hasIt = false
    try {
        hasIt = ("localStorage" in window && window.localStorage !== null)
    } catch (e) {
        return false
    }
    return hasIt
}

const sessionStoreInit = function (state) {
    storageSupported = checkLocalStore()

    // Give different servers different store names.
    storeName = 'stuartCellAtlasState'
    
    if (storageSupported) {
        let store = localStore('get') || {}
        load(store, state)

        // Create a listener to know when to save state
        // This event happens with:
        //  - reload
        //  - new url
        //  - forward & back
        //  - change page within app
        //    - change project
        window.addEventListener('beforeunload', function () {
            save()
        })
    }
}

export default sessionStoreInit
