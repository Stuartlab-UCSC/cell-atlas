
// Gene page state.

const defaultSort = { column: 'size', direction: 'descending' }

const state = {
    'cellType.bubbleTooltip': (state = false, action) => {
        switch(action.type) {
        case 'cellType.bubbleTooltip.mouseOut':
            return null
        case 'cellType.bubbleTooltip.mouseOver':
            return action.value
        default:
            return state
        }
    },
    'cellType.color_by': (state = 'MYL7', action) => {
        switch(action.type) {
        case 'cellType.color_by.uiSet':
            return action.value
        default:
            return state
        }
    },
    'cellType.colorNegMag': (state = 0, action) => {
        switch(action.type) {
        case 'cellType.colorNegMag.set':
            return action.value
        default:
            return state
        }
    },
    'cellType.colorPosMag': (state = 0, action) => {
        switch(action.type) {
        case 'cellType.colorPosMag.set':
            return action.value
        default:
            return state
        }
    },
    'cellType.fetchMessage': (state = ' ', action) => {
        switch(action.type) {
        case 'cellType.fetchMessage.set':
            return action.value
        case 'cellType.fetchMessage.clear':
            return null
        default:
            return state
        }
    },
    'cellType.fetchStatus': (state = 'initial', action) => {
        switch (action.type) {
        case 'cellType.fetchStatus.request':
            return 'request'
        case 'cellType.fetchStatus.waiting':
            return 'waiting'
        case 'cellType.fetchStatus.quiet':
            return 'quiet'
        default:
            return state
        }
    },
    'cellType.firstChartDisplayed': (state = false, action) => {
        switch(action.type) {
        case 'cellType.firstChartDisplayed.set':
            return true
        default:
            return state
        }
    },
    'geneName.helperInLabel': (state = false, action) => {
        switch(action.type) {
        case 'geneName.helperInLabel.true':
            return true
        case 'geneName.helperInLabel.false':
            return false
        default:
            return state
        }
    },
    'cellType.geneName': (state = '', action) => {
        switch(action.type) {
        case 'cellType.geneName.uiSet':
            return action.value
        default:
            return state
        }
    },
    // An error message to be displayed in the gene input.
    'cellType.geneName.errorMessage': (state = null, action) => {
        switch(action.type) {
        case 'cellType.geneName.errorMessage.set':
            return action.value
        case 'cellType.geneName.errorMessage.clear':
            return null
        default:
            return state
        }
    },
    // Those columns containing a single value.
    'cellType.sameValueColumns': (state = {}, action) => {
        switch(action.type) {
        case 'cellType.sameValueColumns.found':
            return action.value
        default:
            return state
        }
    },
    'cellType.showChart': (state = false, action) => {
        switch(action.type) {
        case 'cellType.showChart.toQuietStatus':
            return true
        case 'cellType.showChart.toRequestStatus':
            return false
        default:
            return state
        }
    },
    'cellType.showGene': (state = false, action) => {
        switch(action.type) {
        case 'cellType.showGene.uploadComplete':
            return true
        case 'cellType.showGene.toRequestStatus':
            return false
        default:
            return state
        }
    },
    'cellType.size_by': (state = 'similarity', action) => {
        switch(action.type) {
        case 'cellType.size_by.uiSet':
            return action.value
        default:
            return state
        }
    },
    'cellType.sizeMag': (state = 0, action) => {
        switch(action.type) {
        case 'cellType.sizeMag.set':
            return action.value
        default:
            return state
        }
    },
    'cellType.sort': (state = defaultSort, action) => {
        switch(action.type) {
        case 'cellType.sort.uiSet':
            return { column: action.column, direction: action.direction }
        default:
            return state
        }
    },
}

export default state
