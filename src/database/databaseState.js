// Database page state.
export const defaultQuery = ''

const databaseState = {
    'database.showAddToFavorite': (state = false, action ) => {
        if (action.type === 'database.showAddToFavorite.true') {
            return true
        } else if (action.type === 'database.showAddToFavorite.false') {
            return false
        } else {
            return state
        }
    },
    'database.showSchema': (state = false, action ) => {
        switch (action.type) {
        case 'database.showSchema.toggle':
            return !state
        case 'database.showSchema.hide':
            return false
        default:
            return state
        }
    },
    'database.tableData': (state = [], action) => {
        switch(action.type) {
        case 'database.tableData.load':
            return action.data
        default:
            return state
        }
    },
    'database.tableColumn': (state = [], action) => {
        if (action.type === 'database.tableColumn.load') {
            return action.value
        } else {
            return state
        }
    },
    // Fetch status for the table.
    // Valid stati: quiet, requesting,
    'database.tableStatus': (state = 'quiet', action) => {
        switch (action.type) {
        case 'database.tableStatus.requesting':
            return 'requesting'
        case 'database.tableStatus.quiet':
            return 'quiet'
        case 'database.tableStatus.message':
            return action.value
        default:
            return state
        }
    },
    'database.query': (state = defaultQuery, action) => {
        switch (action.type) {
        case 'database.query.uiSet':
        case 'database.query.favoriteSelect':
        case 'database.query.loadPersist':
        case 'database.query.loadPersistOverride':
            return action.value
        default:
            return state
        }
    },
    'database.query.rowCount': (state = 1, action) => {
        switch (action.type) {
        case 'database.query.rowCount.increment':
            return state + 1
        case 'database.query.rowCount.favoriteSelect':
        case 'database.query.rowCount.loadPersistOverride':
            const query = action.queryString
            // Adjust the row count to include the last row.
            let rowCount = query.split('\n').length
            if (query.substr(-1) !== '\n' && rowCount > 1) {
                rowCount += 1
            }
            return rowCount
        default:
            return state
        }
    },
};

export default databaseState
