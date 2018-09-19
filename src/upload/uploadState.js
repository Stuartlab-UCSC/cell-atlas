
const rowIndex = (id, data) => {
    return data.findIndex(row => {
        return (row.id === id)
    })
}

const defaultTableOrder = { property: 'status', direction: 'desc' }

const uploadState = {
    'upload.fileList': (state = [], action) => {
        switch(action.type) {
        case 'upload.fileList.pop':
            return state.slice(1)
        case 'upload.fileList.selected':
            return action.fileList
        default:
            return state
        }
    },
    'upload.formatShow': (state = {}, action) => {
        switch(action.type) {
        case 'upload.formatShow.toggle':
            let next = {...state}
                next[action.id] = (state[action.id] === undefined) ? true : !state[action.id]
            return next
        default:
            return state
        }
    },
    'upload.idSeq': (state = '5', action) => { // TODO set to 1 later
        if (action.type === 'upload.idSeq.assign') {
            return (parseInt(state, 10) + 1).toString()
        } else {
            return state
        }
    },

    'upload.progress': (state = { loaded: '0', total: '0' }, action) => {
        switch(action.type) {
        case 'upload.progress.reset':
            return { loaded: '0', total: '0' }
        case 'upload.progress.update':
            return { loaded: action.loaded, total: action.total }
        default:
            return state
        }
    },
    'upload.table': (state = { order: defaultTableOrder, data: [
            {
                id: 1,
                name: 'oneProject/myBadData.tsv',
                size: 149.3,
                format: 'TBD',
                status: 'Error'
            },
            {
                id: 2,
                name: 'anotherProject/myCanceledUpload.tsv',
                size: 201.9,
                format: 'TBD',
                status: 'Uploading'
            },
            {
                id: 3,
                name: 'ExampleMetadata.tab',
                size: 446.2,
                format: 'metadata',
                status: '2018-08-02'
            },
            {
                id: 4,
                name: 'ExampleFeature.tab',
                size: 964.2,
                format: 'featureMatrix',
                status: '2018-08-01'
            },
        ]}, action) => {
        
        // With status changes, retain the same order so the row stays in place.
        // Data and order are combined so when both change, subscribers are only
        // notified once.
        let next
        let id = parseInt(action.id, 10)  // catch most id type mistakes
        switch(action.type) {
        case 'upload.table.cancel':
            next = {...state}
            next.data[rowIndex(id, state.data)].status = 'Canceled'
            delete next.order
            return next
        case 'upload.table.delete':
            next = {...state}
            next.data.splice(rowIndex(id, state.data), 1)
            return next
        case 'upload.table.sorted':
            return { data: action.data, order: action.order }
        case 'upload.table.load':
            return {
                data: action.data,
                order: defaultTableOrder,
            }
        case 'upload.table.success':
            next = { data: state.data.slice() }
            next.data[rowIndex(id, state.data)].status = action.date
            return next
        case 'upload.table.error':
            next = { data: state.data.slice() }
            next.data[rowIndex(id, state.data)].status = 'Error'
            return next
        case 'upload.table.timeout':
            next = { data: state.data.slice() }
            next.data[rowIndex(id, state.data)].status = 'Timeout'
            return next
        case 'upload.table.uploading':
            next = {...state}
            next.data.unshift({
                ...action.data,
                status: 'Uploading',
                format: 'TBD',
            })
            delete next.order
            return next
        default:
            return state
        }
    },
};

export default uploadState
