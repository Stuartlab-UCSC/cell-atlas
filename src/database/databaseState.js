// Database page state.

export const defaultFavoriteList = [
    { name: 'mouse datasets', value: 'SELECT * FROM dataset where species="Mus musculus"' },
    { name: 'all clustering', value: 'SELECT * FROM cluster_solution' },
    { name: 'all gene sets', value: 'SELECT * FROM gene_set' },
    { name: 'clustering by name', value:
`SELECT cluster_solution.id as cluster_solution_id,
cluster_solution.name as solution_name,
dataset.id as dataset_id,
dataset.name as dataset_name
FROM cluster_solution
INNER JOIN dataset on dataset.id = cluster_solution.dataset_id
WHERE cluster_solution.name = 'louvain100pcs'` },
    { name: 'cell assignments for a clustering', value:
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
const defaultFavoriteSelected = defaultFavoriteList[0].value
const State = (
    state = {
        favoriteList: defaultFavoriteList,
        favoriteSelected: defaultFavoriteSelected,
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        firstTableDisplayed: false,
        query: defaultFavoriteSelected,
        queryRowCount: 1,
        showSchema: false,
        tableColumn: [],
        tableData: [],
    }, action) => {
        switch(action.type) {
        case 'database.favoriteList.uiAdd':
            let newList = state.favoriteList.slice()
            newList.unshift({
                name: action.name,
                value: action.value,
            })
            return {
                ...state,
                favoriteList: newList
            }
        case 'database.favoriteList.loadPersist':
            return {
                ...state,
                favoriteList: action.value
            }
        case 'database.favoriteSelected.uiSelect':
        case 'database.favoriteSelected.uiAdd':
        case 'database.favoriteSelected.loadPersist':
            return {
                ...state,
                favoriteSelected: action.value
            }
        case 'database.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'database.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'database.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'database.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'database.firstTableDisplayed.set':
            return {
                ...state,
                firstTableDisplayed: true
            }
        case 'database.query.executeClick':
            // Remove any empty lines from the query
            // to allow the maximum height for the table.
            let querySplit = state.query.split('\n')
            const lines = querySplit.filter(line => {
                return (line.length > 0)
            })
            return {
                ...state,
                query: lines.join('\n')
            }
        case 'database.query.favoriteSelect':
        case 'database.query.loadPersist':
        case 'database.query.loadPersistOverride':
        case 'database.query.uiSet':
            return {
                ...state,
                query: action.value
            }
        case 'database.queryRowCount.executeClick':
        case 'database.queryRowCount.favoriteSelect':
        case 'database.queryRowCount.loadPersistOverride':
            let query = action.queryString
            // Find the row count, adjusting for the last row.
            let rowCount = query.split('\n').length
            if (query.substr(-1) !== '\n' && rowCount > 1) {
                rowCount += 1
            }
            return {
                ...state,
                queryRowCount: rowCount
            }
        case 'database.queryRowCount.increment':
            return {
                ...state,
                queryRowCount: state.query + 1
            }
        case 'database.showSchema.hide':
            return {
                ...state,
                showSchema: false
            }
        case 'database.showSchema.toggle':
            return {
                ...state,
                showSchema: !state.showSchema
            }
        case 'database.tableColumn.load':
            return {
                ...state,
                tableColumn: action.value
            }
        case 'database.tableData.load':
            return {
                ...state,
                tableData: action.data
            }
        default:
            return state
        }
    }

export default State
