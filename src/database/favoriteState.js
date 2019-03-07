// Database favorite state.

export const defaultList = [
    { name: 'mouse datasets', value: 'SELECT * FROM dataset where species="Tabula Muris"' },
    { name: 'all cluster solutions', value: 'SELECT * FROM cluster_solution' },
    { name: 'all gene sets', value: 'SELECT * FROM gene_set' },
    { name: 'cluster solutions by name', value:
`SELECT cluster_solution.id as cluster_solution_id,
cluster_solution.name as solution_name,
dataset.id as dataset_id,
dataset.name as dataset_name
FROM cluster_solution
INNER JOIN dataset on dataset.id = cluster_solution.dataset_id
WHERE cluster_solution.name = 'louvain100pcs'` },
    { name: 'cell assignments for a cluster solution', value:
`SELECT cluster.name as cluster_name,
cell_of_cluster.name as cell_name,
cluster_solution.name as solution_name,
dataset.name as dataset_name
FROM cell_of_cluster
INNER JOIN cluster on cluster.id = cell_of_cluster.cluster_id
INNER JOIN cluster_solution on cluster_solution.id = cluster.cluster_solution_id
INNER JOIN dataset on dataset.id = cluster_solution.dataset_id
WHERE dataset.name = '10xGenomics_pbmc8k'
and cluster_solution.name = 'louvain100pcs'` },

]

export const defaultSelected = defaultList[0].value

const databaseFavoriteState = {
    'databaseFavorite.list': (state = defaultList, action) => {
        let newState
        switch (action.type) {
        case 'databaseFavorite.list.uiAdd':
            newState = state.slice()
            newState.unshift({
                name: action.name,
                value: action.value,
            })
            return newState
        case 'databaseFavorite.list.loadPersist':
            return action.value
        default:
            return state
        }
    },
    'databaseFavorite.selected': (state = defaultSelected, action) => {
        switch (action.type) {
        case 'databaseFavorite.selected.uiSelect':
        case 'databaseFavorite.selected.uiAdd':
        case 'databaseFavorite.selected.loadPersist':
            return action.value
        default:
            return state
        }
    },
};

export default databaseFavoriteState
