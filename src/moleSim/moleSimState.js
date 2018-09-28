
// Molecular similarity map: state

const reducers = {
    'moleSim.feature.file': (state = '/fullPath/oneFeatureFile.tsv', action) => {
        switch (action.type) {
        case 'moleSim.feature.file.uiSet':
            return action.value
        default:
            return state
        }
    },
    'moleSim.feature.list': (state = [
            {
                label: 'yours',
                list: [
                    {label: 'oneFeature.tsv', value: '/fullPath/oneFeature.tsv'},
                    {label: 'anotherFeature.tsv', value: '/fullPath/anotherFeature.tsv'},
                    {label: 'yetAnotherFeature.tsv', value: '/fullPath/yetAnotherFeature.tsv'},
                ],
            },
            {
                label: 'public',
                list: [
                    {label: 'exampleFeature.tab', value: '/fullPath/exampleFeature.tab'},
                ],
            }
        ], action) => {
        
        switch (action.type) {
        case 'moleSim.feature.list.load':
            return action.value
        default:
            return state
        }
    },
    'moleSim.feature.url': (state = 'http://some.com/exampleFeatureUrl',
        action) => {
        switch (action.type) {
        case 'moleSim.feature.url.uiSet':
            return action.value
        default:
            return state
        }
    },
    'moleSim.feature.zero': (state = false, action) => {
        if (action.type === 'moleSim.feature.zero.toggle') {
            return !state
        }
        return state
    },
    'moleSim.featureMatrix.expand': (state = false, action) => {
        if (action.type === 'moleSim.featureMatrix.expand.toggle') {
            return !state
        }
        return state
    },
    'moleSim.format.expand': (state = false, action) => {
        if (action.type === 'moleSim.format.expand.toggle') {
            return !state
        }
        return state
    },
    'moleSim.fullSimilarity.expand': (state = false, action) => {
        if (action.type === 'moleSim.fullSimilarity.expand.toggle') {
            return !state
        }
        return state
    },
    'moleSim.metadata.expand': (state = false, action) => {
        if (action.type === 'moleSim.metadata.expand.toggle') {
            return !state
        }
        return state
    },
    'moleSim.metadata.file': (state = '/fullPath/oneMetadataFile.tsv',
        action) => {
        switch (action.type) {
        case 'moleSim.metadata.file.uiSet':
            return action.value
        default:
            return state
        }
    },
    'moleSim.metadata.list': (state = [
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
        case 'moleSim.metadata.list.load':
            return action.value
        default:
            return state
        }
    },
    'moleSim.metadata.url': (state = 'http://some.com/exampleMetadataUrl', action) => {
        switch (action.type) {
        case 'moleSim.metadata.url.uiSet':
            return action.value
        default:
            return state
        }
    },
    'moleSim.name': (state = 'map', action) => {
        if (action.type === 'moleSim.name.uiSet') {
            return action.value
        }
        return state
    },
    'moleSim.sparseSimilarity.expand': (state = false, action) => {
        if (action.type === 'moleSim.sparseSimilarity.expand.toggle') {
            return !state
        }
        return state
    },
    'moleSim.xyPositions.expand': (state = false, action) => {
        if (action.type === 'moleSim.xyPositions.expand.toggle') {
            return !state
        }
        return state
    },
}

export default reducers
