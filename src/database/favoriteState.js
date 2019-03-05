// Database favorite state.

export const defaultList = [
    { name: 'mouse datasets', value: 'SELECT * FROM dataset where species="mouse: Tabula Muris"' },
    { name: 'all cluster solutions', value: 'SELECT * FROM cluster_solution' },
    { name: 'all gene sets', value: 'SELECT * FROM gene_set' },
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
