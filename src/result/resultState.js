
const defaultTableOrder = { property: 'status', direction: 'desc' }

const rowIndex = (id, data) => {
    return data.findIndex(row => {
        return (row.id === id)
    })
}

const resultState = {
    'result.idSeq': (state = '6', action) => { // TODO set to 1 later
        if (action.type === 'result.idSeq.assign') {
            return (parseInt(state, 10) + 1).toString()
        } else {
            return state
        }
    },
    'result.table': (state = { order: defaultTableOrder, data: [
        {id: 1,
            name: 'myMap', analysis: 'simMap', date: '2018-08-08', result: '----', status: 'Canceled',
            parms: ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv']
        },
        {id: 2, name: 'myTrajectory', analysis: 'trajectory', date: '2018-08-03', result: '----', status: 'Running',
            parms: ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv']
        },
        {id: 3, name: 'anotherTrajectory', analysis: 'trajectory', date: '2018-08-07', result: 1.9, status: 'Success',
            parms: ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv']
        },
        {id: 4, name: 'anotherMap', analysis: 'simMap', date: '2018-06-02', result: '----', status: 'Success',
            parms: ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv']
        },
        {id: 5, name: 'myCellTypes', analysis: 'cellTypePsychic', date: '2018-06-06', result: '----', status: 'Error',
            parms: ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv']
        },
    ]}, action) => {

       // With status changes, retain the same order so the row stays in place.
        let index, next
        switch(action.type) {
        case 'result.table.cancel':
            next = {...state}
            index = rowIndex(action.id, state.data)
            next.data[index].status = 'Canceled'
            delete next.order
            return next
        case 'result.table.delete':
            next = {...state}
            index = rowIndex(action.id, state.data)
            next.data.splice(index, 1)
            return next
        case 'result.table.sorted':
            return { data: action.data, order: action.order }
        case 'result.table.load':
            return {
                data: action.data,
                order: defaultTableOrder,
            }
        default:
            return state
        }
    },
    'result.parmShow': (state = {}, action) => {
        let next = {...state}
        switch(action.type) {
        case 'result.parmShow.toggle':
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
};

export default resultState
