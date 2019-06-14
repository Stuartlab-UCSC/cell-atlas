
// Cell type sheet page state.

const defaultColormap = []
const defaultData = {
    colorBar: [],
    cellTypes: [],
    clusters: [],
    colors: [],
    genes: [],
    sizes: [],
}
const defaultDims = {
    bubblesHeight: 0,
    bubblesWidth: 0,
    cellTypesHeight: 100,
    cellTypeLength: 120,
    colorBarHeight: 10,
    colWidth: 14,
    clusterButtonWidth: 150,
    clusterMarginTop: 10,
    fontSize: 11,
    geneWidth: 100,
    labelFontSize: 16,
    legendWidth: 100,
    rowHeight: 14,
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
        clusterButton: false,
        clusterMode: 'sortable',
        colormap: defaultColormap,
        colormapPicker: null,
        data: defaultData,
        dims: defaultDims,
        fetchMessage: ' ',
        fetchStatus: 'initial',
        firstChartDisplayed: true,
        showChart: false,
        showSave: false,
        sheetList: defaultSheetList,
        sheetSelected: defaultSheetSelected,
        tableColumn: [],
        tableData: [],
    }, action) => {
        let newState = null
        switch(action.type) {
        case 'cellTypeWork.cellTypeButton.show':
            // The cellType position is saved here.
           return {
                ...state,
                cellTypeButton: parseInt(action.value, 10)
            }
        case 'cellTypeWork.cellTypeButton.hide':
            return {
                ...state,
                cellTypeButton: null
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
        case 'cellTypeWork.clusterButton.show':
            // The cellType position is saved here.
            return {
                ...state,
                clusterButton: true
            }
        case 'cellTypeWork.clusterButton.hide':
            return {
                ...state,
                clusterButton: false
            }
        case 'cellTypeWork.clusterMode.select':
            return {
                ...state,
                clusterMode: 'select'
            }
        case 'cellTypeWork.clusterMode.sortable':
            return {
                ...state,
                clusterMode: 'sortable'
            }
        case 'cellTypeWork.colormap.create':
            return {
                ...state,
                colormap: action.value
            }
        case 'cellTypeWork.colormap.default':
            return {
                ...state,
                colormap: defaultColormap
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
        case 'cellTypeWork.data.default':
            return {
                ...state,
                data: defaultData
            }
        case 'cellTypeWork.data.load':
            return {
                ...state,
                data: action.value
            }
        
        case 'cellTypeWork.data.cellTypeChange':
            newState = {
                ...state,
                data: state.data,
            }
            newState.data.cellTypes[action.position] = action.value
            return newState
        case 'cellTypeWork.data.cellTypeReorder':
            return {
                ...state,
                data: {
                    ...state.data,
                    cellTypes: [...action.value]
                }
            }
        case 'cellTypeWork.data.clusterReorder':
            return {
                ...state,
                data: {
                    ...state.data,
                    clusters: [...action.value]
                }
            }
        case 'cellTypeWork.data.colorBar.uiSet':
            // The colorbar segment takes on the index of the colormap member
            // that matches the color of the picked color.
            const index = action.colormap.findIndex(color => {
                return (color === action.color)
            })
            newState = {
                ...state,
                data: state.data,
            }
            newState.data.colorBar[action.position] = index
            return newState
        case 'cellTypeWork.dims.default':
            return {
                ...state,
                dims: defaultDims
            }
        case 'cellTypeWork.dims.set':
            return {
                ...state,
                dims: action.value
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
        case 'cellTypeWork.data.geneReorder':
            return {
                ...state,
                data: {
                    ...state.data,
                    genes: [...action.value]
                }
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
        case 'cellTypeWork.showChart.toRequestStatus':
            return {
                ...state,
                showChart: false
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
