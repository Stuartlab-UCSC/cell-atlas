
const rowIndex = (id, data) => {
    return data.findIndex(row => {
        return (row.id === id)
    })
}

const defaultTableOrder = { property: 'status', direction: 'desc' }

const uploadState = {
    'upload.fileList': (state =[], action) => {
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
        let next
        switch(action.type) {
        case 'upload.formatShow.toggle':
            next = {...state}
            if (state[action.id] === undefined) {
                next[action.id] = true
            } else {
                next[action.id] = !state[action.id]
            }
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
                name: 'myBadData.tsv',
                size: 149.3,
                format: 'toBeDetermined',
                status: 'Error'
            },
            {
                id: 2,
                name: 'myCanceledUpload.tsv',
                size: 201.9,
                format: 'toBeDetermined',
                status: 'Canceled'
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
        let index, next
        switch(action.type) {
        case 'upload.table.cancel':
            next = {...state}
            index = rowIndex(action.id, state.data)
            next.data[index].status = 'Canceled'
            delete next.order
            return next
        case 'upload.table.delete':
            next = {...state}
            index = rowIndex(action.id, state.data)
            next.data.splice(index, 1)
            return next
        case 'upload.table.sorted':
            return { data: action.data, order: action.order }
        case 'upload.table.load':
            return {
                data: action.data,
                order: defaultTableOrder,
            }
        case 'upload.table.success':
            next = {...state}
            index = rowIndex(action.id, state.data)
            next.data[index].status = action.date
            delete next.order
            return next
        case 'upload.table.uploading':
            next = {...state}
            action.data.status = 'Uploading'
            action.data.format = 'toBeDetermined'
            next.data.unshift(action.data)
            delete next.order
            return next
        default:
            return state
        }
    },
};

export default uploadState
