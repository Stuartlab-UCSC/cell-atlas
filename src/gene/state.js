
// Gene page state.

const defaultSort = { column: 'color', direction: 'descending' }

const State = (
    state = {
        bubbleTooltip: null,
        color_by: 'log2_fold_change_vs_next',
        colorColumnTooltip: null,
        colorNegMag: 0,
        colorPosMag: 0,
        fetchMessage: ' ',
        fetchStatus: 'initial',
        firstChartDisplayed: false,
        sort: defaultSort,
        name: '',
        nameErrorMessage: null, // error message displayed in gene input
        showChart: false,
        sameValueColumns: {}, // columns containing a single value
        size_by: 'sensitivity',
        sizeMag: 0,

    }, action) => {
        switch(action.type) {
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
        case 'gene.colorNegMag.set':
            return {
                ...state,
                colorNegMag: action.value
            }
        case 'gene.colorPosMag.set':
            return {
                ...state,
                colorPosMag: action.value
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
                fetchMessage: 'waiting'
            }
        case 'gene.fetchStatus.quiet':
            return {
                ...state,
                fetchMessage: 'quiet'
            }
        case 'gene.firstChartDisplayed.set':
            return {
                ...state,
                firstChartDisplayed: true
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
        case 'gene.sizeMag.set':
            return {
                ...state,
                sizeMag: action.value
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
