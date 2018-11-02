
// Search page: state
const list = [
    {label: 'ALK2'},
    {label: 'BRCA2'},
    {label: 'TP53'},
    {label: 'cell type 1'},
    {label: 'cell type 2'},
    {label: 'cell type 3'},
    {label: 'gene module containing ALK2'},
    {label: 'gene module containing BRCA2'},
    {label: 'gene module containing TP53'},
]

const reducers = {
    'search.list': (state = list, action) => {
        switch (action.type) {
            default:
                return state
        }
    },
    'search.value': (state = null, action) => {
        switch (action.type) {
            case 'search.value.uiSet':  // set from the home page
            case 'search.value.uiSetHome':  // set from the home page
                return action.value
            default:
                return state
        }
    },
    'search.results': (state = null, action) => {
        switch (action.type) {
            case 'search.result.load':
                return action.value
            default:
                return state
        }
    },
}

export default reducers
