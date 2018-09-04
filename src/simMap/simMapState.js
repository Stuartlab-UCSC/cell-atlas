
const reducers = {

    'simMap.metadataShow': (state = false, action) => {
        if (action.type === 'simMap.metadataShow.toggle') {
            return !state
        } else {
            return state
        }
    },
    'simMap.featureShow': (state = true, action) => {
        if (action.type === 'simMap.featureShow.toggle') {
            return !state
        } else {
            return state
        }
    },
}

export default reducers
