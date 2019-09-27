
// Cell type clusters of the cell type workbench state.

const State = (
    state = {
        menu: false,
    }, action) => {
        switch(action.type) {
        case 'cellTypeCluster.menu.clickAway':
        case 'cellTypeCluster.menu.optionClicked':
        case 'cellTypeCluster.menu.irrelevant':
        case 'cellTypeCluster.menu.sorting':
            return {
                ...state,
                menu: null
            }
        case 'cellTypeCluster.menu.open':
            return {
                ...state,
                menu: parseInt(action.value, 10)
            }
        default:
            return state
        }
    }

export default State
