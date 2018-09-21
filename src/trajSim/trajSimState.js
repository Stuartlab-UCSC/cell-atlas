
// Trajectory similarity analysis page: state

const reducers = {

    'trajSim.algorithm': (state = '', action) => {
        if (action.type === 'trajSim.algorithm.uiSet') {
            return action.value
        }
        return state
    },
    'trajSim.cellXbranch.expand': (state = true, action) => {
        if (action.type === 'trajSim.cellXbranch.expand.toggle') {
            return !state
        }
        return state
    },
    'trajSim.description': (state = '', action) => {
        if (action.type === 'trajSim.description.uiSet') {
            return action.value
        }
        return state
    },
    'trajSim.featureMatrix.expand': (state = true, action) => {
        if (action.type === 'trajSim.featureMatrix.expand.toggle') {
            return !state
        }
        return state
    },
    'trajSim.geneMatrixTransposed.expand': (state = true, action) => {
        if (action.type === 'trajSim.geneMatrixTransposed.expand.toggle') {
            return !state
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
