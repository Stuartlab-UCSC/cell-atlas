
// Cell type sheet page state.

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
        cellTypeButton: null,
        cellTypeHighlight: null,
        cellTypeInput: null,
        cellTypeMode: 'readOnly',
        colormap: [],
        colormapPicker: null,
        contextMenu: false,
        dims: defaultDims,
        fetchMessage: ' ',
        fetchStatus: 'initial',
        firstChartDisplayed: true,
        render: renderSeq++,
        showChart: false,
        showSave: false,
        sheetList: defaultSheetList,
        sheetSelected: defaultSheetSelected,
        tableColumn: [],
        tableData: [],
    }, action) => {
        switch(action.type) {
        case 'cellTypeWork.cellTypeButton.show':
            // The cellType position is saved here.
           return {
                ...state,
                cellTypeButton: true
            }
        case 'cellTypeWork.cellTypeButton.hide':
            return {
                ...state,
                cellTypeButton: false
            }
        case 'cellTypeWork.cellTypeHighlight.show':
            // The cellType position is saved here.
            return {
                ...state,
                cellTypeHighlight: parseInt(action.value, 10)
            }
        case 'cellTypeWork.cellTypeHighlight.hide':
            return {
                ...state,
                cellTypeHighlight: null
            }
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
        case 'cellTypeWork.contextMenu.close':
            return {
                ...state,
                contextMenu: false
            }
        case 'cellTypeWork.contextMenu.mouseUp':
        case 'cellTypeWork.contextMenu.open':
            return {
                ...state,
                contextMenu: {
                    open: true,
                    position: action.position,
                }
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
        case 'cellTypeWork.showSave.hide':
            return {
                ...state,
                showSave: false
            }
        case 'cellTypeWork.showSave.show':
            return {
                ...state,
                showSave: true
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
