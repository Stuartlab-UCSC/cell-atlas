
// Cell Type Psychic: state

const reducers = {
    'typePsych.clusters.expand': (state = false, action) => {
        if (action.type === 'typePsych.clusters.expand.toggle') {
            return !state
        }
        return state
    },
    'typePsych.clusters.file': (state = '/fullPath/oneClustersFile.tsv', action) => {
        switch (action.type) {
        case 'typePsych.clusters.file.uiSet':
            return action.value
        default:
            return state
        }
    },
    'typePsych.clusters.list': (state = [
            {
                label: 'yours',
                list: [
                    {label: 'oneClusters.tsv', value: '/fullPath/oneClusters.tsv'},
                    {label: 'anotherClusters.tsv', value: '/fullPath/anotherClusters.tsv'},
                    {label: 'yetAnotherClusters.tsv', value: '/fullPath/yetAnotherClusters.tsv'},
                ],
            },
            {
                label: 'public',
                list: [
                    {label: 'exampleClusters.tab', value: '/fullPath/exampleClusters.tab'},
                ],
            }
        ], action) => {
        
        switch (action.type) {
        case 'typePsych.clusters.list.load':
            return action.value
        default:
            return state
        }
    },
    'typePsych.clusters.url': (state = 'http://some.com/exampleClustersUrl',
        action) => {
        switch (action.type) {
        case 'typePsych.clusters.url.uiSet':
            return action.value
        default:
            return state
        }
    },
    'typePsych.geneMatrix.expand': (state = false, action) => {
        if (action.type === 'typePsych.geneMatrix.expand.toggle') {
            return !state
        }
        return state
    },
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
    'typePsych.metadata.expand': (state = false, action) => {
        if (action.type === 'typePsych.metadata.expand.toggle') {
            return !state
        }
        return state
    },
    'typePsych.metadata.file': (state = '/fullPath/oneMetadataFile.tsv', action) => {
        switch (action.type) {
        case 'typePsych.metadata.file.uiSet':
            return action.value
        default:
            return state
        }
    },
    'typePsych.metadata.list': (state = [
            {
                label: 'yours',
                list: [
                    {label: 'oneMetadata.tsv', value: '/fullPath/oneMetadata.tsv'},
                    {label: 'anotherMetadata.tsv', value: '/fullPath/anotherMetadata.tsv'},
                    {label: 'yetAnotherMetadata.tsv', value: '/fullPath/yetAnotherMetadata.tsv'},
                ],
            },
            {
                label: 'public',
                list: [
                    {label: 'exampleMetadata.tab', value: '/fullPath/exampleMetadata.tab'},
                ],
            }
        ], action) => {
        
        switch (action.type) {
        case 'typePsych.metadata.list.load':
            return action.value
        default:
            return state
        }
    },
    'typePsych.metadata.url': (state = 'http://some.com/exampleMetadataUrl',
        action) => {
        switch (action.type) {
        case 'typePsych.metadata.url.uiSet':
            return action.value
        default:
            return state
        }
    },
}

export default reducers

