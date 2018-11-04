
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
const listExpression = [
    {label: 'ALK2'},
    {label: 'BRCA2'},
    {label: 'TP53'},
    {label: 'MODULE_1'},
    {label: 'MODULE_2'},
    {label: 'MODULE_3'},
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
            case 'search.value.uiSet':
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
    'searchExpression.list': (state = listExpression, action) => {
        switch (action.type) {
            default:
                return state
        }
    },
    'searchExpression.value': (state = null, action) => {
        switch (action.type) {
            case 'searchExpression.value.uiSet':
                 return action.value
            default:
                return state
        }
    },
}

export default reducers
