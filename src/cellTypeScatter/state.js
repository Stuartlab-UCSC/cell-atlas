
// Scatterplot of the cell type work page, state.

const State = (
    state = {
        fetchMessage: ' ',
        fetchStatus: 'initial',
        firstChartDisplayed: true,
        showChart: false,
    }, action) => {
        let newState = null
        switch(action.type) {
        case 'cellTypeScatter.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeScatter.fetchMessage.clear':
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
        case 'cellTypeScatter.firstChartDisplayed.set':
            return {
                ...state,
                firstChartDisplayed: true
            }
        case 'cellTypeScatter.showChart.loading':
            return {
                ...state,
                showChart: false
            }
        case 'cellTypeScatter.showChart.toQuietStatus':
            return {
                ...state,
                showChart: true
            }
        case 'cellTypeScatter.showChart.toRequestStatus':
            return {
                ...state,
                showChart: false
            }
        default:
            return state
        }
    }

export default State
