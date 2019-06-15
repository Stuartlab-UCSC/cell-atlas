
const State = (
    state = {
        cluster: null,
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        firstTableDisplayed: false,
        tableColumn: [],
        tableData: [],
    }, action) => {
        switch(action.type) {
        case 'cellTypeGene.cluster.uiSet':
            return {
                ...state,
                cluster: action.value
            }
       case 'cellTypeGene.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'cellTypeGene.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeGene.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'cellTypeGene.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellTypeGene.firstTableDisplayed.set':
            return {
                ...state,
                firstTableDisplayed: true
            }
        case 'cellTypeGene.tableColumn.load':
            return {
                ...state,
                tableColumn: action.value
            }
        case 'cellTypeGene.tableData.load':
            return {
                ...state,
                tableData: action.value
            }
        default:
            return state
        }
    }

export default State
