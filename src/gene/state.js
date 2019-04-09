
// Gene page state.

const defaultSort = { column: 'color', direction: 'descending' }

const state = {
    'gene.bubbleTooltip': (state = false, action) => {
        switch(action.type) {
        case 'gene.bubbleTooltip.mouseOut':
            return null
        case 'gene.bubbleTooltip.mouseOver':
            return action.value
        default:
            return state
        }
    },
    'gene.color_by': (state = 'log2_fold_change_vs_next', action) => {
        switch(action.type) {
        case 'gene.color_by.uiSet':
            return action.value
        default:
            return state
        }
    },
    'gene.colorNegMag': (state = 0, action) => {
        switch(action.type) {
        case 'gene.colorNegMag.set':
            return action.value
        default:
            return state
        }
    },
    'gene.colorPosMag': (state = 0, action) => {
        switch(action.type) {
        case 'gene.colorPosMag.set':
            return action.value
        default:
            return state
        }
    },
    'gene.fetchMessage': (state = ' ', action) => {
        switch(action.type) {
        case 'gene.fetchMessage.set':
            return action.value
        case 'gene.fetchMessage.clear':
            return null
        default:
            return state
        }
    },
    'gene.fetchStatus': (state = 'initial', action) => {
        switch (action.type) {
        case 'gene.fetchStatus.waiting':
            return 'waiting'
        case 'gene.fetchStatus.quiet':
            return 'quiet'
        default:
            return state
        }
    },
    'gene.firstChartDisplayed': (state = false, action) => {
        switch(action.type) {
        case 'gene.firstChartDisplayed.set':
            return true
        default:
            return state
        }
    },
    'gene.name': (state = 'CCL4', action) => {
        switch(action.type) {
        case 'gene.name.uiSet':
            return action.value
        default:
            return state
        }
    },
    'gene.name.errorMessage': (state = null, action) => {
        switch(action.type) {
        case 'gene.name.errorMessage.set':
            return action.value
        case 'gene.name.errorMessage.clear':
            return null
        default:
            return state
        }
    },
    'gene.showChart': (state = false, action) => {
        switch(action.type) {
        case 'gene.showChart.toQuietStatus':
            return true
        case 'gene.showChart.toRequestStatus':
            return false
        default:
            return state
        }
    },
    'gene.size_by': (state = 'sensitivity', action) => {
        switch(action.type) {
        case 'gene.size_by.uiSet':
            return action.value
        default:
            return state
        }
    },
    'gene.sizeMag': (state = 0, action) => {
        switch(action.type) {
        case 'gene.sizeMag.set':
            return action.value
        default:
            return state
        }
    },
    'gene.sort': (state = defaultSort, action) => {
        switch(action.type) {
        case 'gene.sort.uiSet':
            return { column: action.column, direction: action.direction }
        default:
            return state
        }
    },
}

export default state
