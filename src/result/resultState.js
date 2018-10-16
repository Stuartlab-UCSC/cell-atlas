
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
            name: 'myMap', analysis: 'molecularSimilarity', date: '2018-08-08', result: '----', status: 'Canceled',
            parms: ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv']
        },
        {id: 2, name: 'myTrajectory', analysis: 'trajectorySimilarity', date: '2018-08-03', result: '----', status: 'Running',
            parms: ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv']
        },
        {id: 3, name: 'anotherTrajectory', analysis: 'trajectorySimilarity', date: '2018-08-07', result: 1.9, status: 'Success',
            parms: ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv']
        },
        {id: 4, name: 'anotherMap', analysis: 'molecularSimilarity', date: '2018-06-02', result: '----', status: 'Success',
            parms: ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv']
        },
        {id: 5, name: 'myCellTypes', analysis: 'cellTypePsychic', date: '2018-06-06', result: '----', status: 'Error',
            parms: ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv']
        },
    ]}, action) => {

       // With status changes, retain the same order so the row stays in place.
        let next
        let id = parseInt(action.id, 10)
        switch(action.type) {
        case 'result.table.cancel':
            next = {...state}
            next.data[rowIndex(id , state.data)].status = 'Canceled'
            return next
        case 'result.table.delete':
            next = {...state}
            next.data.splice(rowIndex(id, state.data), 1)
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
    'result.parm.expand': (state = {}, action) => {
        let id = parseInt(action.id, 10)
        switch(action.type) {
        case 'result.parm.expand.toggle':
            let next = {...state}
            next[id] = (state[id] === undefined) ? true : !state[id]
            return next
        default:
            return state
        }
    },
};

export default resultState
