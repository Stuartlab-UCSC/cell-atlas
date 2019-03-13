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
    // Fetch status for the table.
    // Valid stati: quiet, requesting,
    'dataset.tableStatus': (state = 'quiet', action) => {
        switch (action.type) {
        case 'dataset.tableStatus.requesting':
            return 'requesting'
        case 'dataset.tableStatus.quiet':
            return 'quiet'
        case 'dataset.tableStatus.message':
            return action.value
        default:
            return state
        }
    },
};

export default datasetState
