
// Scatterplot of the cell type work page, state.

let renderSeq = 0

const State = (
    state = {
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        render: renderSeq,
        showChart: false,
    }, action) => {
        switch(action.type) {
        case 'cellTypeScatter.gene.clear':
            return {
                ...state,
                gene: null
            }
        case 'cellTypeScatter.gene.set':
            return {
                ...state,
                gene: action.value
            }
        case 'cellTypeScatter.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeScatter.fetchMessage.clear':
        case 'cellTypeScatter.fetchMessage.sheetRemove':
               return {
                ...state,
                fetchMessage: null
            }
        case 'cellTypeScatter.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellTypeScatter.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'cellTypeScatter.render.now':
            return {
                ...state,
                render: renderSeq++
            }
        case 'cellTypeScatter.showChart.getNewAssignmentPlot':
        case 'cellTypeScatter.showChart.getNewGenePlot':
        case 'cellTypeScatter.showChart.getNewWorksheet':
        case 'cellTypeScatter.showChart.toRequestStatus':
        case 'cellTypeScatter.showChart.sheetRemove':
            return {
                ...state,
                showChart: false
            }
        case 'cellTypeScatter.showChart.toQuietStatus':
            return {
                ...state,
                showChart: true
            }
        default:
            return state
        }
    }

export default State
