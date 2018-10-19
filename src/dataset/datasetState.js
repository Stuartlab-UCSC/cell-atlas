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
    //'dataset.table': (state = { order: defaultTableOrder, data: [] },
    'dataset.table': (state = { order: defaultTableOrder, data: [
        {
            id: 1,
            organ: `Bladder, Heart_and_Aorta, Kidney, Limb_Muscle, Liver, Lung, 
Mammary_Gland, Marrow, Spleen, Thymus, Tongue, Trachea'`,
            name: 'Tabula Muris droplet',
            'primary data': 'data/mouse/tabula_muris',
            'scanpy object': 'mouse_tabulaMuris_droplet.h5ad',
            'sample metadata': 'yes',
            'sample count': 70118,
            species: 'mouse: Tabula Muris',
        },
        {
            id: 2,
            organ: 'immune bone',
            name: 'Immune Bone',
            'primary data': 'immune_census',
            'scanpy object': 'ica_bone_marrow.h5ad',
            'sample metadata': 'yes',
            'sample count': 378000,
            species: 'human',
        },
        {
            id: 3,
            organ: 'blood',
            name: 'Hemotopoietic',
            'primary data': 'hematopoietic',
            'scanpy object': 'GSE79331_hematopoietic.h5ad',
            'sample metadata': 'yes',
            'sample count': 681,
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
