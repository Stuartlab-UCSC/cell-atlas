
const reducers = {

    'moleSim.metadataShow': (state = false, action) => {
        if (action.type === 'moleSim.metadataShow.toggle') {
            return !state
        } else {
            return state
        }
    },
    'moleSim.featureShow': (state = true, action) => {
        if (action.type === 'moleSim.featureShow.toggle') {
            return !state
        } else {
            return state
        }
    },
    'moleSim.zeroReplace': (state = false, action) => {
        if (action.type === 'moleSim.zeroReplace.toggle') {
            return !state
        } else {
            return state
        }
    },
}

export default reducers
