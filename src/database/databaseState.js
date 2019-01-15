// Database page state.

const databaseState = {
    'database.fetch': (state = {status: 'quiet', data: ''}, action) => {
        switch (action.type) {
        case 'database.fetch.requested':
            return {status: 'requested', data: ''}
        case 'database.fetch.received':
            return {status: 'received', data: action.data}
        case 'database.fetch.failed':
            return {status: 'failed', data: action.data}
        case 'database.fetch.quiet': // TODO needed?
            return {status: 'quiet', data: state.data}
        default:
            return state
        }
    },
    'database.query': (state = '', action) => {
        if (action.type === 'database.query.uiSet') {
            return action.value
        } else {
            return state
        }
    },
};

export default databaseState
