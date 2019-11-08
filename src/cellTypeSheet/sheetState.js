
// Cell type worksheet sheet state.

const defaultSheetList = []
const defaultSheetSelected = null

const State = (
    state = {
        fetchMessage: null,
        fetchStatus: 'quiet',
        list: defaultSheetList,
        ownedByUser: false,
        saveAs: '',
        selected: null,
    }, action) => {
        switch(action.type) {
        case 'cellTypeSheet.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeSheet.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'cellTypeSheet.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellTypeSheet.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'cellTypeSheet.list.load':
            return {
                ...state,
                list: action.value
            }
        case 'cellTypeSheet.list.saveAsSheetLoaded':
        case 'cellTypeSheet.list.sheetRemoveUndo':
            // If the sheet is already in the list we're done.
            const value = action.value
            const i = state.list.findIndex(sheet => {
                return sheet.value === value
            })
            if (i > -1) {
                return state
            }
            // Insert the new sheet into those owned by the current user,
            // alphabetically. Note that the user's sheets are listed above
            // sheets owned by others.
            let newList = []
            let added = false
            state.list.forEach(sheet => {
                if (!added) {
                    const j = sheet.value.indexOf('/')
                    if ( j > -1 || value < sheet.value) {
                        // We've reached the sheets owned by others or
                        // the new is lexographically less than this sheet.
                        newList.push({ value, name: value })
                        added = true
                    }
                }
                newList.push(sheet)
            })
            return {
                ...state,
                list: newList,
            }
        case 'cellTypeSheet.list.sheetRemove':
            const iRemove = state.list.findIndex(sheet => {
                return sheet.value === action.value
            })
            if (iRemove < 0) {
                return state
            }
            let removeList = [...state.list]
            removeList.splice(iRemove, 1)
            return {
                ...state,
                list: removeList
            }
        case 'cellTypeSheet.list.userChange':
            return {
                ...state,
                list: defaultSheetList,
            }
        case 'cellTypeSheet.ownedByUser.saveAsSheetLoaded':
        case 'cellTypeSheet.ownedByUser.uiSelect':
        case 'cellTypeSheet.ownedByUser.sheetLoaded':
            const val = action.value
            return {
                ...state,
                ownedByUser: (val && val.indexOf('/') < 0),
            }
        case 'cellTypeSheet.saveAs.clear':
            return {
                ...state,
                saveAs: ''
            }
        case 'cellTypeSheet.saveAs.cleanedNameSet':
        case 'cellTypeSheet.saveAs.uiSet':
            return {
                ...state,
                saveAs: action.value
            }
        case 'cellTypeSheet.selected.firstSheet':
        case 'cellTypeSheet.selected.loadPersist':
        case 'cellTypeSheet.selected.saveAsSheetLoaded':
        case 'cellTypeSheet.selected.uiSelect':
            return {
                ...state,
                selected: action.value,
            }
        case 'cellTypeSheet.selected.clearBeforeGet':
        case 'cellTypeSheet.selected.sheetRemove':
        case 'cellTypeSheet.selected.userChange':
            return {
                ...state,
                selected: null
            }
        default:
            return state
        }
    }
    
const cellTypeSheetRemoveState = (
    state = {
        fetchMessage: null,
        fetchStatus: 'quiet',
        remove: null,
    }, action) => {
        switch(action.type) {
        case 'cellTypeSheetRemove.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeSheetRemove.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'cellTypeSheetRemove.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellTypeSheetRemove.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'cellTypeSheetRemove.name.menuOptionClick':
            return {
                ...state,
                name: action.value,
            }
        case 'cellTypeSheetRemove.name.removedFromServer':
        case 'cellTypeSheetRemove.name.serverError':
        case 'cellTypeSheetRemove.name.undo':
            return {
                ...state,
                name: null,
            }
        default:
            return state
        }
    }
    
const cellTypeSheetUploadState = (
state = {
    dataset: null,
    description: null,
    fetchMessage: null,
    fetchStatus: 'quiet',
    group: null,
    helpOpen: false,
    method: null,
    name: null,
    open: false,
    button: false,
}, action) => {
    switch(action.type) {
    case 'cellTypeSheetUpload.button.enable':
        return {
            ...state,
            button: true
        }
    case 'cellTypeSheetUpload.button.disable':
        return {
            ...state,
            button: false
        }
    case 'cellTypeSheetUpload.method.clear':
        return {
            ...state,
            method: null
        }
    case 'cellTypeSheetUpload.method.uiSet':
        return {
            ...state,
            method: action.value
        }
    case 'cellTypeSheetUpload.dataset.clear':
        return {
            ...state,
            dataset: null
        }
    case 'cellTypeSheetUpload.dataset.uiSet':
        return {
            ...state,
            dataset: action.value
        }
    case 'cellTypeSheetUpload.description.clear':
        return {
            ...state,
            description: null
        }
    case 'cellTypeSheetUpload.description.uiSet':
        return {
            ...state,
            description: action.value
        }
    case 'cellTypeSheetUpload.fetchMessage.clear':
        return {
            ...state,
            fetchMessage: null
        }
    case 'cellTypeSheetUpload.fetchMessage.set':
        return {
            ...state,
            fetchMessage: action.value
        }
    case 'cellTypeSheetUpload.fetchStatus.waiting':
        return {
            ...state,
            fetchStatus: 'waiting'
        }
    case 'cellTypeSheetUpload.fetchStatus.quiet':
        return {
            ...state,
            fetchStatus: 'quiet'
        }
    case 'cellTypeSheetUpload.group.clear':
        return {
            ...state,
            group: null
        }
    case 'cellTypeSheetUpload.helpOpen.now':
        return {
            ...state,
            helpOpen: true
        }
    case 'cellTypeSheetUpload.helpOpen.close':
        return {
            ...state,
            helpOpen: false
        }
    case 'cellTypeSheetUpload.name.clear':
        return {
            ...state,
            name: null
        }
    case 'cellTypeSheetUpload.name.uiSet':
        return {
            ...state,
            name: action.value
        }
    case 'cellTypeSheetUpload.open.now':
        return {
            ...state,
            open: true
        }
    case 'cellTypeSheetUpload.open.close':
        return {
            ...state,
            open: false
        }
    default:
        return state
    }
}

                
export default State
export { cellTypeSheetRemoveState, cellTypeSheetUploadState, defaultSheetList,
    defaultSheetSelected }
