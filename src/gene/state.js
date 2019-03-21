
// Gene page state.

const state = {
    // Fetch status.
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
    'geneName.value': (state = '', action) => {
        switch(action.type) {
        case 'geneName.value.uiSet':
            return action.value
        default:
            return state
        }
    },
    'geneName.errorMessage': (state = null, action) => {
        switch(action.type) {
        case 'geneName.errorMessage.set':
            return action.value
        case 'geneName.errorMessage.clear':
            return null
        default:
            return state
        }
    },
};

export default state
