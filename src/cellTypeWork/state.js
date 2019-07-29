
// Cell type sheet page state.

import { fontFamily } from 'app/themeData'

let renderSeq = 0  // A change here causes the worksheet to re-rendered
const defaultDims = {
    bubblesHeight: 0,
    bubblesWidth: 0,
    cellTypesHeight: 100,
    cellTypeLength: 120,
    colorBarHeight: 10,
    colorRange:{},
    colWidth: 14,
    clusterMarginTop: 10,
    initialPageLoaded: false,
    fontFamily,
    fontSize: 11,
    geneWidth: 100,
    NaNcolor: false,
    labelFontSize: 16,
    legendWidth: 100,
    rowHeight: 14,
    sizeRange:{},
}
export const defaultSheetList = [
]

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
        render: renderSeq++,
        sheetList: defaultSheetList,
        sheetSaveAs: '',
        sheetSelected: null,
        showChart: false,
        showEditables: false,
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
        case 'cellTypeWork.initialPageLoaded.true':
            return {
                ...state,
                initialPageLoaded: true
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
        case 'cellTypeWork.sheetList.new':
            // Remove the sheet from the list if it is there.
            const value = action.value
            let sheetList = [...state.sheetList]
            const foundIndex = sheetList.findIndex(sheet => {
                return sheet.value === value
            })
            if (foundIndex > -1) {
                sheetList.splice(foundIndex, 1)
            }
            // Add a new sheet to the list then select it.
            sheetList.unshift({value, name: value})
            return {
                ...state,
                sheetList,
                sheetSelected: value,
            }
        case 'cellTypeWork.sheetList.userChange':
            return {
                ...state,
                sheetList: defaultSheetList,
                sheetSelected: null,
            }
        case 'cellTypeWork.sheetSaveAs.clear':
            return {
                ...state,
                sheetSaveAs: ''
            }
        case 'cellTypeWork.sheetSaveAs.uiSet':
            return {
                ...state,
                sheetSaveAs: action.value
            }
        case 'cellTypeWork.sheetSelected.loadPersist':
        case 'cellTypeWork.sheetSelected.uiSelect':
            return {
                ...state,
                sheetSelected: action.value
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
        case 'cellTypeWork.showEditables.hide':
            return {
                ...state,
                showEditables: false
            }
        case 'cellTypeWork.showEditables.show':
            return {
                ...state,
                showEditables: true
            }
        default:
            return state
        }
    }

const cellTypeSheetState = (
    state = {
        fetchMessage: ' ',
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
export { cellTypeSheetState }
