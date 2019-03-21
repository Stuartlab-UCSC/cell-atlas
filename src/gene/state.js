
// Gene page state.

const state = {
    // Fetch status.
    'gene.color_by': (state = 'z_stat', action) => {
        switch(action.type) {
        case 'gene.color_by.uiSet':
            return action.value
        default:
            return state
        }
    },
    'gene.fetchStatus': (state = 'quiet', action) => {
        switch (action.type) {
        case 'gene.fetchStatus.request':
            return 'request'
        case 'gene.fetchStatus.waiting':
            return 'waiting'
        case 'gene.fetchStatus.quiet':
            return 'quiet'
        case 'gene.fetchStatus.message':
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
    'gene.name.value': (state = '', action) => {
        switch(action.type) {
        case 'gene.name.value.uiSet':
            return action.value
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
};

export default state
