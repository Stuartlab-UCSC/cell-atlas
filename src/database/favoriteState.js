// Database favorite state.

const listStub = [
    { name: 'all cluster solutions', value: 'SELECT * FROM cluster_solution' },
    { name: 'all gene sets', value: 'SELECT * FROM gene_set' },
]
const defaultSelected = listStub[0].value

const databaseFavoriteState = {
    'database.favorite.list': (state = listStub, action) => {
        switch (action.type) {
        case 'database.favorite.list.uiAdd':
            let newState = state.slice()
            newState.unshift({
                name: action.name,
                value: action.value,
            })
            return newState
        default:
            return state
        }
    },
    'database.favorite.selected': (state = defaultSelected, action) => {
        switch (action.type) {
        case 'database.favorite.selected.uiSelect':
        case 'database.favorite.selected.uiAdd':
            return action.value
        default:
            return state
        }
    },
};

export default databaseFavoriteState
