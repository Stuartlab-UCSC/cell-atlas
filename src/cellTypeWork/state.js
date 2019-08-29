
// Cell type sheet page state.

import { fontFamily } from 'app/themeData'

let renderSeq = 0  // A change here causes the worksheet to re-rendered
const defaultDims = {
    bubblesHeight: 0,
    bubblesWidth: 0,
    cellTypesHeight: 130,
    cellTypeLength: 156,
    clusterBarHeight: 22,
    colorBarHeight: 10,
    colorRange:{},
    colWidth: 18,
    clusterMarginTop: 10,
    initialPageLoaded: false,
    fontFamily,
    fontSize: 14,
    geneWidth: 130,
    NaNcolor: false,
    labelFontSize: 19,
    legendWidth: 130,
    rowHeight: 18,
    sizeRange:{},
}
const defaultSheetList = []
const defaultSheetSelected = null

const State = (
    state = {
        cellTypeInput: null,
        cellTypeMode: 'readOnly',
        clusterMenu: null,
        colormap: [],
        colormapPicker: null,
        dims: defaultDims,
        fetchMessage: ' ',
        fetchStatus: 'initial',
        geneMenu: null,
        menu: false,
        render: renderSeq++,
        sheetList: defaultSheetList,
        sheetSaveAs: '',
        sheetSelected: null,
        sheetOwnedByUser: false,
        showChart: false,
        topDrawer: true,
    }, action) => {
        switch(action.type) {
        case 'cellTypeWork.cellTypeInput.show':
            // The cellType position is saved here.
            return {
                ...state,
                cellTypeInput: parseInt(action.value, 10)
            }
        case 'cellTypeWork.cellTypeInput.hide':
            return {
                ...state,
                cellTypeInput: null
            }
        case 'cellTypeWork.cellTypeMode.select':
            return {
                ...state,
                cellTypeMode: 'select'
            }
        case 'cellTypeWork.cellTypeMode.readOnly':
            return {
                ...state,
                cellTypeMode: 'readOnly'
            }
        case 'cellTypeWork.clusterMenu.close':
            return {
                ...state,
                clusterMenu: null
            }
        case 'cellTypeWork.clusterMenu.open':
            return {
                ...state,
                clusterMenu: parseInt(action.position, 10)
            }
        case 'cellTypeWork.colormap.create':
            return {
                ...state,
                colormap: action.value
            }
        case 'cellTypeWork.colormapPicker.show':
            // The colorBar position is saved here.
            return {
                ...state,
                colormapPicker: action.value
            }
        case 'cellTypeWork.colormapPicker.hide':
            return {
                ...state,
                colormapPicker: null
            }
        case 'cellTypeWork.dims.default':
            return {
                ...state,
                dims: defaultDims
            }
        case 'cellTypeWork.dims.set':
            return {
                ...state,
                dims: {
                    ...state.dims,
                    bubblesWidth: action.bubblesWidth,
                    bubblesHeight: action.bubblesHeight,
                    colorRange: action.colorRange,
                    sizeRange: action.sizeRange,
                    NaNcolor: action.NaNcolor,
                }
            }
        case 'cellTypeWork.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeWork.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'cellTypeWork.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellTypeWork.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'cellTypeWork.geneMenu.close':
            return {
                ...state,
                geneMenu: null
            }
        case 'cellTypeWork.geneMenu.open':
            return {
                ...state,
                geneMenu: parseInt(action.position, 10),
            }
        case 'cellTypeWork.initialPageLoaded.true':
            return {
                ...state,
                initialPageLoaded: true
            }
        case 'cellTypeWork.menu.show':
            return {
                ...state,
                menu: true
            }
        case 'cellTypeWork.menu.hide':
            return {
                ...state,
                menu: false
            }
        case 'cellTypeWork.render.now':
            return {
                ...state,
                render: renderSeq++
            }
        case 'cellTypeWork.sheetList.load':
            return {
                ...state,
                sheetList: action.value
            }
        case 'cellTypeWork.sheetList.saveAsWorksheetLoaded':
            // If the sheet is already in the list we're done.
            const value = action.value
            const i = state.sheetList.findIndex(sheet => {
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
            state.sheetList.forEach(sheet => {
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
                sheetList: newList,
            }
        case 'cellTypeWork.sheetList.userChange':
            return {
                ...state,
                sheetList: defaultSheetList,
            }
        case 'cellTypeWork.sheetOwnedByUser.saveAsWorksheetLoaded':
        case 'cellTypeWork.sheetOwnedByUser.uiSelect':
            return {
                ...state,
                sheetOwnedByUser: (action.value.indexOf('/') < 0),
            }
        case 'cellTypeWork.sheetSaveAs.clear':
            return {
                ...state,
                sheetSaveAs: ''
            }
        case 'cellTypeWork.sheetSaveAs.cleanedNameSet':
        case 'cellTypeWork.sheetSaveAs.uiSet':
            return {
                ...state,
                sheetSaveAs: action.value
            }
        case 'cellTypeWork.sheetSelected.loadPersist':
        case 'cellTypeWork.sheetSelected.saveAsWorksheetLoaded':
        case 'cellTypeWork.sheetSelected.firstSheet':
        case 'cellTypeWork.sheetSelected.uiSelect':
            return {
                ...state,
                sheetSelected: action.value,
            }
        case 'cellTypeWork.sheetSelected.userChange':
            return {
                ...state,
                sheetSelected: null
            }
        case 'cellTypeWork.showChart.loading':
            return {
                ...state,
                showChart: false
            }
        case 'cellTypeWork.showChart.toQuietStatus':
            return {
                ...state,
                showChart: true
            }
        case 'cellTypeWork.showChart.toRequestStatus':
            return {
                ...state,
                showChart: false
            }
        case 'cellTypeWork.showColorPicker.show':
            return {
                ...state,
                showColorPicker: action.value
            }
        case 'cellTypeWork.showColorPicker.hide':
            return {
                ...state,
                showColorPicker: null,
            }
        case 'cellTypeWork.topDrawer.open':
            return {
                ...state,
                topDrawer: true
            }
        case 'cellTypeWork.topDrawer.close':
            return {
                ...state,
                topDrawer: false
            }
        default:
            return state
        }
    }

const cellTypeSheetState = (
    state = {
        fetchMessage: null,
        fetchStatus: 'initial',
    }, action) => {
        switch (action.type) {
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
        default:
            return state
        }
    }


export default State
export { cellTypeSheetState, defaultSheetList, defaultSheetSelected }
