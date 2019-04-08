// Dataset page state.

const datasetState = {
    'dataset.tableData': (state = [], action) => {
        switch(action.type) {
        case 'dataset.tableData.load':
            return action.data
        default:
            return state
        }
    },
    'dataset.tableColumn': (state = [], action) => {
        if (action.type === 'dataset.tableColumn.load') {
            return action.value
        } else {
            return state
        }
    },
    'dataset.fetchMessage': (state = ' ', action) => {
        switch(action.type) {
        case 'dataset.fetchMessage.set':
            return action.value
        case 'dataset.fetchMessage.clear':
            return null
        default:
            return state
        }
    },
    // Fetch status for the table.
    'dataset.fetchStatus': (state = 'quiet', action) => {
        switch (action.type) {
        case 'dataset.fetchStatus.waiting':
            return 'waiting'
        case 'dataset.fetchStatus.quiet':
            return 'quiet'
        default:
            return state
        }
    },
};

export default datasetState
