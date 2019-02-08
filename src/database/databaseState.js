// Database page state.

const defaultTableOrder = { property: 'id', direction: 'asc' }

const databaseState = {
    'database.showSchema': (state = false, action ) => {
        if (action.type === 'database.showSchema.toggle') {
            return !state
        } else {
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
    // Valid stati: quiet, requesting, renderReady
    'database.tableStatus': (state = 'quiet', action) => {
        if (action.type === 'database.tableStatus.set') {
            return action.value
        } else {
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
    'database.query': (state = 'SELECT * FROM dataset', action) => {
        if (action.type === 'database.query.uiSet') {
            return action.value
        } else {
            return state
        }
    },
    'database.query.rowCount': (state = 1, action) => {
        if (action.type === 'database.query.rowCount.increment') {
            return state + 1
        } else {
            return state
        }
    },
};

export default databaseState
