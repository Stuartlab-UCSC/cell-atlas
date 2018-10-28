// Dataset page state.

const defaultTableOrder = { property: 'species', direction: 'asc' }

const datasetState = {
    'dataset.idSeq': (state = '6', action) => { // TODO set to 1 later
        if (action.type === 'dataset.idSeq.assign') {
            return (parseInt(state, 10) + 1).toString()
        } else {
            return state
        }
    },
    'dataset.table': (state = { order: defaultTableOrder, data: [] },
        action) => {
        switch(action.type) {
        case 'dataset.table.load':
            return {
                data: action.data,
                order: defaultTableOrder,
            }
        case 'dataset.table.uiSetOrder':
            return { ...state, order: action.order }
        default:
            return state
        }
    },
    'dataset.expand': (state = {}, action) => {
        let id = parseInt(action.id, 10)
        let column = parseInt(action.column, 10)
        switch(action.type) {
        case 'dataset.expand.toggle':
            let next = {...state}
            next[id][column] = (state[id][column] === undefined) ? true : !state[id][column]
            return next
        default:
            return state
        }
    },
};

export default datasetState
