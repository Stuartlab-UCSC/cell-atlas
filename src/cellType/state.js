
// Gene page state.

const State = (
    state = {
        bubbleTooltip: false,
        color_by: '',  // TODO null instead?
        colorNegMag: 0,
        colorPosMag: 0,
        fetchMessage: ' ',
        fetchStatus: 'initial',
        firstChartDisplayed: false,
        sameValueColumns: {}, // columns containing a single value
        showChart: false,
        showGene: false,
        size_by: 'similarity',
        sizeMag: 0,
        sort: { column: 'size', direction: 'descending' },
    }, action) => {
        switch(action.type) {
        case 'cellType.bubbleTooltip.mouseOut':
            return {
                ...state,
                bubbleTooltip: null
            }
        case 'cellType.bubbleTooltip.mouseOver':
            return {
                ...state,
                bubbleTooltip: action.value
            }
        case 'cellType.color_by.uiSet':
            return {
                ...state,
                color_by: action.value
            }
        case 'cellType.colorNegMag.set':
            return {
                ...state,
                colorNegMag: action.value
            }
        case 'cellType.colorPosMag.set':
            return {
                ...state,
                colorPosMag: action.value
            }
        case 'cellType.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellType.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'cellType.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'cellType.fetchStatus.request':
            return {
                ...state,
                fetchStatus: 'request'
            }
        case 'cellType.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellType.firstChartDisplayed.set':
            return {
                ...state,
                firstChartDisplayed: true
            }
        case 'cellType.sameValueColumns.found':
            return {
                ...state,
                sameValueColumns: action.value
            }
        case 'cellType.showChart.toQuietStatus':
            return {
                ...state,
                showChart: true
            }
        case 'cellType.showChart.toRequestStatus':
            return {
                ...state,
                showChart: false
            }
        case 'cellType.showGene.uploadComplete':
            return {
                ...state,
                showGene: true
            }
        case 'cellType.showGene.toRequestStatus':
            return {
                ...state,
                showGene: false
            }
        case 'cellType.size_by.uiSet':
            return {
                ...state,
                size_by: action.value
            }
        case 'cellType.sizeMag.set':
            return {
                ...state,
                sizeMag: action.value
            }
        case 'cellType.sort.uiSet':
            return {
                ...state,
                sort: {
                    column: action.column,
                    direction: action.direction
                }
            }
        default:
            return state
        }
    }

export default State
