
// Gene page state.

const State = (
    state = {
        // bubble common
        bubbleTooltip: false,
        colorBy: 'similarity',
        sameValueColumns: {}, // columns containing a single value
        showChart: false,
        sizeBy: 'similarity',
        bubbleRange: { min: 0, max: 0 },
        sort: { column: 'size', direction: 'descending' },

        colorRange: { min: 0, max: 0 },
        
        // fetch common
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        
        // unique
        firstChartDisplayed: false,
        showGene: false,
        
    }, action) => {
        switch(action.type) {
        case 'cellType.bubbleRange.set':
            return {
                ...state,
                bubbleRange: action.value
            }
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
        case 'cellType.colorBy.uiSet':
            return {
                ...state,
                colorBy: action.value
            }
        case 'cellType.colorRange.set':
            return {
                ...state,
                colorRange: action.value
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
        case 'cellType.sizeBy.uiSet':
            return {
                ...state,
                sizeBy: action.value
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
