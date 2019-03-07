// Database page state.
const defaultTableOrder = { columnPosition: 1, direction: 'asc' }

export const defaultQuery = ''

const databaseState = {
    'database.showDownload': (state = false, action ) => {
        if (action.type === 'database.showDownload.true') {
            return true
        } else if (action.type === 'database.showDownload.false') {
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
    'database.table': (state = { order: defaultTableOrder, data: [] },
        action) => {
        switch(action.type) {
        case 'database.table.load':
            //console.log('databaseState:database.table.load:', rxGet(id + '.table'))
            return {
                data: action.data,
                order: defaultTableOrder,
            }
        case 'database.table.uiSetOrder':
            return { ...state, order: action.order }
        case 'database.table.clear':
            return { ...state, data: ['retrieving...'] }
        default:
            return state
        }
    },
    'database.tableHead': (state = [], action) => {
        if (action.type === 'database.tableHead.load') {
            return action.value
        } else {
            return state
        }
    },
    // Fetch status for the table.
    // Valid stati: quiet, requesting, renderReady
    'database.tableStatus': (state = 'quiet', action) => {
        switch (action.type) {
        case 'database.tableStatus.requesting':
            return 'requesting'
        case 'database.tableStatus.quiet':
            return 'quiet'
        default:
            return state
        }
    },

    /*
    'database.fetch': (state = {status: 'quiet', data: ''}, action) => {
        switch (action.type) {
        case 'database.fetch.requested':
            return {status: 'requested', data: ''}
        case 'database.fetch.received':
            console.log('!!! action.data:', action.data)
            return {status: 'received', data: action.data}
        case 'database.fetch.failed':
            return {status: 'failed', data: action.data}
        case 'database.fetch.quiet': // TODO needed?
            return {status: 'quiet', data: state.data}
        default:
            return state
        }
    },
    */
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
