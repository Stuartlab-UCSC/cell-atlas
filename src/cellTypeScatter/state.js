
// Scatterplot of the cell type work page, state.

const State = (
    state = {
        expanded: false,
        fetchMessage: ' ',
        fetchStatus: 'initial',
        firstChartDisplayed: true,
        showChart: false,
    }, action) => {
        switch(action.type) {
        case 'cellTypeScatter.expanded.true':
            return {
                ...state,
                expanded: true
            }
        case 'cellTypeScatter.expanded.false':
            return {
                ...state,
                expanded: false
            }
        case 'cellTypeScatter.expanded.toggle':
            return {
                ...state,
                expanded: !state.expanded
            }
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
        case 'cellTypeScatter.gene.uiSet':
            return {
                ...state,
                gene: action.value
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
