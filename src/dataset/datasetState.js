// Dataset page state.

const State = (
    state = {
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        tableColumn: [],
        tableData: [],
    }, action) => {
        switch(action.type) {
        case 'dataset.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'dataset.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'dataset.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'dataset.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        default:
            return state
        }
    }

export default State
