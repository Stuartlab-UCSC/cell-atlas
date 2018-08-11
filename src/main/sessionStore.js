
// state.js
// An object to write and load state

import rx from 'main/rx'

let LOGGING = false  // true means log the state and store on save and load
let storageSupported
let storeName

function isDefault (key, val) {
    
    return false
    //return (val === varInfo[key].defalt)
}

function logState (label) {

    // Log values as they are in state. Don't show defalut values.
    if (!LOGGING) {
        return
    }
    console.log(label, 'state...')

    if (!isDefault(key, val)) {
        console.log(key, ':', val)
    }
}

function logStore (label, store) {

    // Log values as they are in the session store.
    if (!LOGGING) {
        return
    }
    console.log(label, 'store...')
    _.each(store, function (val, key) {
        //if (key === 'activeAttrs' || key === 'dynamicAttrs') {
        console.log(key, ':', store[key])
        //}
    })
}

function setDefaults () {

    // Set the default of each persistent variable.
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

function save () {

    // Save state by writing it to local browser store.
    localStore('remove')
    localStore('set', exports.saveEach())
}

function load (storeIn, page) {
    
    if (!storageSupported) {
        return
    }
    
    let store = storeIn || localStore('get')

    logStore('\nLoad', store)

    // Walk through the saved state loading anything we recognize
    _.each(store, function (val, keyIn) {
        let key = keyIn
        
        // TODO there is a better redux way to do this.
        rx.set(key + '.loadPersist', { loadPersist: val })
    })
    rx.set('inited.state')
    
    // Log all persistent store state values.
    logState('Load')
}

function checkLocalStore () {

    // Check to see if browser supports HTML5 Store
    // Any modern browser should pass.
    try {
        ("localStorage" in window && window.localStorage !== null)
    } catch (e) {
        return false
    }
    return true
}

exports.saveEach = function () {

    // Log all persistent store state values.
    logState('\nSave')

    // Save each persistent state value.
    let store = {}

    // Walk though our list of keys and save those that are not the default.
    _.each(varInfo, function (info, key) {
        val = rx.get(key)

        // Only save non-defaults.
        if (!isDefault(key, val)) {
            store[key] = val
        }
    })
    
    logStore('Save', store)

    return jsonStringify(store)
}

exports.hasLocalStore = function () {
    return storageSupported
}

exports.init = function () {
    storageSupported = checkLocalStore()
    setDefaults()

    // Give different servers different store names.
    storeName = location.host + '-hexMapState'
    
    if (storageSupported) {

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
