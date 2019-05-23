
// Cell type sheet page state.

export const defaultSheetList = [
    { name: 'heart of cells #1', value: 'heart of cells #1' },
]
const defaultSheetSelected = defaultSheetList[0].value

const State = (
    state = {
        clusters: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
        firstRender: true,
        geneCluster: '',
        getGeneTable: false,
        showSave: false,
        sheetList: defaultSheetList,
        sheetSelected: defaultSheetSelected,
        tableColumn: [],
        tableData: [],
    }, action) => {
        switch(action.type) {
        case 'cellTypeWork.clusters.load':
            return {
                ...state,
                clusters: action.value
            }
        case 'cellTypeWork.firstRender.rendered':
            return {
                ...state,
                firstRender: false
            }
        case 'cellTypeWork.geneCluster.uiSet':
            return {
                ...state,
                geneCluster: action.value
            }
        case 'cellTypeWork.getGeneTable.true':
            return {
                ...state,
                getGeneTable: true
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
