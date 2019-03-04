// Database page state.

import { defaultSelected as defaultFavoriteSelected  }
    from 'database/favoriteState'

const defaultTableOrder = { columnPosition: 1, direction: 'asc' }

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
    'database.query': (state = defaultFavoriteSelected, action) => {
        switch (action.type) {
        case 'database.query.uiSet':
            return action.value
        case 'database.query.favoriteSelected':
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
            return action.value
        default:
            return state
        }
    },
};

export default databaseState
