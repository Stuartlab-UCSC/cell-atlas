
// Cell type sheet page state.

export const defaultSheetList = [
    { name: 'heart of cells #1', value: 'heart of cells #1' },
]
const defaultSheetSelected = defaultSheetList[0].value

const State = (
    state = {
        firstRender: true,
        showSave: false,
        sheetList: defaultSheetList,
        sheetSelected: defaultSheetSelected,
        tableColumn: [],
        tableData: [],
    }, action) => {
        switch(action.type) {
        case 'cellTypeWork.firstRender.rendered':
            return {
                ...state,
                firstRender: false
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
