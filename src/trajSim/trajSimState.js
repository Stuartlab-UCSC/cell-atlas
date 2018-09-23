
// Trajectory similarity analysis page: state

const reducers = {

    'trajSim.cellXbranch.file': (state = '/fullPath/oneCellXbranchFile.tsv',
        action) => {
        switch (action.type) {
        case 'trajSim.cellXbranch.file.uiSet':
            return action.value
        default:
            return state
        }
    },
    'trajSim.cellXbranch.list': (state = [
            {
                label: 'yours',
                list: [
                    {label: 'oneCellXbranch.tsv', value: '/fullPath/oneCellXbranch.tsv'},
                    {label: 'anotherCellXbranch.tsv', value: '/fullPath/anotherCellXbranch.tsv'},
                    {label: 'yetAnotherCellXbranch.tsv', value: '/fullPath/yetAnotherCellXbranch.tsv'},
                ],
            },
            {
                label: 'public',
                list: [
                    {label: 'exampleCellXbranch.tab', value: '/fullPath/exampleCellXbranch.tab'},
                ],
            }
        ], action) => {
        
        switch (action.type) {
        case 'trajSim.cellXbranch.list.load':
            return action.value
        default:
            return state
        }
    },
    'trajSim.cellXbranch.url': (
        state = 'http://some.com/exampleCellXbrancheUrl', action) => {
        switch (action.type) {
        case 'trajSim.cellXbranch.url.uiSet':
            return action.value
        default:
            return state
        }
    },
    'trajSim.geneMatrixTransposed.file': (
        state = '/fullPath/oneGeneMatrixTransposedFile.tsv', action) => {
        switch (action.type) {
        case 'trajSim.geneMatrixTransposed.file.uiSet':
            return action.value
        default:
            return state
        }
    },
    'trajSim.geneMatrixTransposed.list': (state = [
            {
                label: 'yours',
                list: [
                    {label: 'oneGeneMatrixTransposed.tsv', value: '/fullPath/oneGeneMatrixTransposed.tsv'},
                    {label: 'anotherGeneMatrixTransposed.tsv', value: '/fullPath/anotherGeneMatrixTransposed.tsv'},
                    {label: 'yetAnotherGeneMatrixTransposed.tsv', value: '/fullPath/yetAnotherGeneMatrixTransposed.tsv'},
                ],
            },
            {
                label: 'public',
                list: [
                    {label: 'exampleGeneMatrixTransposed.tab', value: '/fullPath/exampleGeneMatrixTransposed.tab'},
                ],
            }
        ], action) => {
        
        switch (action.type) {
        case 'trajSim.geneMatrixTransposed.list.load':
            return action.value
        default:
            return state
        }
    },
    'trajSim.geneMatrixTransposed.url': (
        state = 'http://some.com/exampleGeneMatrixTransposedUrl', action) => {
        switch (action.type) {
        case 'trajSim.geneMatrixTransposed.url.uiSet':
            return action.value
        default:
            return state
        }
    },
    'trajSim.featureMatrix.file': (state = '/fullPath/oneFeatureMatrixFile.tsv',
        action) => {
        switch (action.type) {
        case 'trajSim.featureMatrix.file.uiSet':
            return action.value
        default:
            return state
        }
    },
    'trajSim.featureMatrix.list': (state = [
            {
                label: 'yours',
                list: [
                    {label: 'oneFeatureMatrix.tsv', value: '/fullPath/oneFeatureMatrix.tsv'},
                    {label: 'anotherFeatureMatrix.tsv', value: '/fullPath/anotherFeatureMatrix.tsv'},
                    {label: 'yetAnotherFeatureMatrix.tsv', value: '/fullPath/yetAnotherFeatureMatrix.tsv'},
                ],
            },
            {
                label: 'public',
                list: [
                    {label: 'exampleFeatureMatrix.tab', value: '/fullPath/exampleFeatureMatrix.tab'},
                ],
            }
        ], action) => {
        
        switch (action.type) {
        case 'trajSim.featureMatrix.list.load':
            return action.value
        default:
            return state
        }
    },
    'trajSim.featureMatrix.url': (
        state = 'http://some.com/exampleFeatureMatrixUrl', action) => {
        switch (action.type) {
        case 'trajSim.featureMatrix.url.uiSet':
            return action.value
        default:
            return state
        }
    },
    'trajSim.algorithm': (state = '', action) => {
        if (action.type === 'trajSim.algorithm.uiSet') {
            return action.value
        }
        return state
    },
    'trajSim.description': (state = '', action) => {
        if (action.type === 'trajSim.description.uiSet') {
            return action.value
        }
        return state
    },
    'trajSim.name': (state = '', action) => {
        if (action.type === 'trajSim.name.uiSet') {
            return action.value
        }
        return state
    },
    'trajSim.species': (state = '', action) => {
        if (action.type === 'trajSim.species.uiSet') {
            return action.value
        }
        return state
    },
    'trajSim.tissue': (state = '', action) => {
        if (action.type === 'trajSim.tissue.uiSet') {
            return action.value
        }
        return state
    },
}

export default reducers
