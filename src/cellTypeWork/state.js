
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
    fontFamily,
    fontSize: 11,
    geneWidth: 100,
    labelFontSize: 16,
    legendWidth: 100,
    rowHeight: 14,
    sizeRange:{},
}
export const defaultSheetList = [
    { value:'heart of cells #1', name: 'heart of cells #1' },
    { value:'#2', name: '#2' },
]
const defaultSheetSelected = defaultSheetList[0].value

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
        firstChartDisplayed: true,
        geneMenu: null,
        render: renderSeq++,
        showChart: false,
        showEditables: false,
        sheetList: defaultSheetList,
        sheetSelected: defaultSheetSelected,
        tableColumn: [],
        tableData: [],
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
        case 'cellTypeWork.firstChartDisplayed.set':
            return {
                ...state,
                firstChartDisplayed: true
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
        case 'cellTypeWork.tableColumn.load':
            return {
                ...state,
                tableColumn: action.value
            }
        case 'cellTypeWork.tableData.load':
            return {
                ...state,
                tableData: action.data
            }
        default:
            return state
        }
    }

export default State
