// Dataset page state.

const defaultTableOrder = { property: 'organ', direction: 'asc' }

const datasetState = {
    'dataset.idSeq': (state = '6', action) => { // TODO set to 1 later
        if (action.type === 'dataset.idSeq.assign') {
            return (parseInt(state, 10) + 1).toString()
        } else {
            return state
        }
    },
    'dataset.table': (state = { order: defaultTableOrder, data: [
        {
            id: 1,
            organ: 'immune bone',
            name: 'Immune Bone',
            primaryData: 'immune_census',
            scanpyObject: 'ica_bone_marrow.h5ad',
            sampleMetadata: 'yes',
            sampleCount: 378000,
            species: 'human',
        },
        {
            id: 2,
            organ: 'blood',
            name: 'Hemotopoietic',
            primaryData: 'hematopoietic',
            scanpyObject: 'GSE79331_hematopoietic.h5ad',
            sampleMetadata: 'yes',
            sampleCount: 681,
            species: 'human',
        },
    ]}, action) => {
        switch(action.type) {
        case 'dataset.table.load':
            return {
                data: action.data,
                order: defaultTableOrder,
            }
        case 'dataset.table.sorted':
            return { data: action.data, order: action.order }
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
