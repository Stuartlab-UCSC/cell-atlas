
// Cell Type Psychic: state

const reducers = {
    'typePsych.geneMatrix.file': (state = '/fullPath/oneGeneMatrixFile.tsv', action) => {
        switch (action.type) {
        case 'typePsych.geneMatrix.file.uiSet':
            return action.value
        default:
            return state
        }
    },
    'typePsych.geneMatrix.list': (state = [
            {
                label: 'yours',
                list: [
                    {label: 'oneGeneMatrix.tsv', value: '/fullPath/oneGeneMatrix.tsv'},
                    {label: 'anotherGeneMatrix.tsv', value: '/fullPath/anotherGeneMatrix.tsv'},
                    {label: 'yetAnotherGeneMatrix.tsv', value: '/fullPath/yetAnotherGeneMatrix.tsv'},
                ],
            },
            {
                label: 'public',
                list: [
                    {label: 'exampleGeneMatrix.tab', value: '/fullPath/exampleGeneMatrix.tab'},
                ],
            }
        ], action) => {
        
        switch (action.type) {
        case 'typePsych.geneMatrix.list.load':
            return action.value
        default:
            return state
        }
    },
    'typePsych.geneMatrix.url': (state = 'http://some.com/exampleGeneMatrixUrl',
        action) => {
        switch (action.type) {
        case 'typePsych.geneMatrix.url.uiSet':
            return action.value
        default:
            return state
        }
    },
}

export default reducers

