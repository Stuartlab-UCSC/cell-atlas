// Database page state.
export const defaultQuery = ''

const databaseState = {
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
    'database.fetchStatus': (state = 'quiet', action) => {
        switch (action.type) {
        case 'database.fetchStatus.waiting':
            return 'waiting'
        case 'database.fetchStatus.quiet':
            return 'quiet'
        case 'database.fetchStatus.message':
            return action.value
        default:
            return state
        }
    },
    'database.firstTableDisplayed': (state = false, action) => {
        switch(action.type) {
        case 'database.firstTableDisplayed.set':
            return true
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
        case 'database.query.executeClick':
            // Remove any empty lines from the query
            // to allow the maximum height for the table.
            let querySplit = state.split('\n')
            const lines = querySplit.filter(line => {
                return (line.length > 0)
            })
            return lines.join('\n')
        default:
            return state
        }
    },
    'database.query.rowCount': (state = 1, action) => {
        let query, rowCount
        switch (action.type) {
        case 'database.query.rowCount.increment':
            return state + 1
        case 'database.query.rowCount.executeClick':
        case 'database.query.rowCount.favoriteSelect':
        case 'database.query.rowCount.loadPersistOverride':
            query = action.queryString
            // Find the row count, adjusting for the last row.
            rowCount = query.split('\n').length
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
