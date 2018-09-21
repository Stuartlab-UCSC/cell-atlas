
// Molecular similarity map: state

const reducers = {

    'moleSim.feature.expand': (state = true, action) => {
        if (action.type === 'moleSim.feature.expand.toggle') {
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
    'moleSim.name': (state = 'map', action) => {
        if (action.type === 'moleSim.name.uiSet') {
            return action.value
        }
        return state
    },
    'moleSim.zero': (state = false, action) => {
        if (action.type === 'moleSim.zero.toggle') {
            return !state
        }
        return state
    },
}

export default reducers
