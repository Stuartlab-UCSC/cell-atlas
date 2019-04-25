
// Gene page state.

const defaultSort = { column: 'color', direction: 'descending' }

const State = (
    state = {
        bubbleRange: { min: 0, max: 0 },
        bubbleTooltip: null,
        color_by: 'log2_fold_change_vs_next',
        colorColumnTooltip: null,
        colorRange: { min: 0, max: 0 },
        fetchMessage: ' ',
        fetchStatus: 'initial',
        firstChartDisplayed: false,
        sort: defaultSort,
        name: '',
        nameErrorMessage: null, // error message displayed in gene input
        showChart: false,
        sameValueColumns: {}, // columns containing a single value
        size_by: 'sensitivity',
    }, action) => {
        switch(action.type) {
        case 'gene.bubbleRange.set':
            return {
                ...state,
                bubbleRange: action.value
            }
        case 'gene.bubbleTooltip.mouseOut':
            return {
                ...state,
                bubbleTooltip: null
            }
        case 'gene.bubbleTooltip.mouseOver':
            return {
                ...state,
                bubbleTooltip: action.value
            }
        case 'gene.color_by.uiSet':
            return {
                ...state,
                color_by: action.value
            }
        case 'gene.colorColumnTooltip.mouseOut':
            return {
                ...state,
                colorColumnTooltip: null
            }
        case 'gene.colorColumnTooltip.mouseOver':
            return {
                ...state,
                colorColumnTooltip: action.value
            }
        case 'gene.colorRange.set':
            return {
                ...state,
                colorRange: action.value
            }
        case 'gene.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'gene.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'gene.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'gene.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'gene.firstChartDisplayed.set':
            return {
                ...state,
                firstChartDisplayed: true
            }
        case 'gene.showChart.sorting':
            return {
                ...state,
                showChart: false
            }
        case 'gene.showChart.toQuietStatus':
            return {
                ...state,
                showChart: true
            }
        case 'gene.showChart.toRequestStatus':
            return {
                ...state,
                showChart: false
            }
        case 'gene.sameValueColumns.found':
            return {
                ...state,
                sameValueColumns: action.value
            }
        case 'gene.size_by.uiSet':
            return {
                ...state,
                size_by: action.value
            }
        case 'gene.sort.reset':
            return {
                ...state,
                sort: defaultSort
            }
        case 'gene.sort.uiSet':
            return {
                ...state,
                sort: { column: action.column, direction: action.direction }
            }
        default:
            return state
        }
    }

export default State
