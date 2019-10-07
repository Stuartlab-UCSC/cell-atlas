
// Cell type clusters of the cell type workbench state.

const State = (
    state = {
        geneStats: false,
        menu: false,
        makeSameType: false,
        makeType: false,
        select: null,
        selectInfo: false,
    }, action) => {
        switch(action.type) {
        case 'cellTypeCluster.geneStats.set':
            return {
                ...state,
                geneStats: action.value
            }
        case 'cellTypeCluster.makeSameType.set':
            return {
                ...state,
                makeSameType: action.value
            }
        case 'cellTypeCluster.makeType.set':
            return {
                ...state,
                makeType: action.value
            }
        case 'cellTypeCluster.menu.clickAway':
        case 'cellTypeCluster.menu.optionSelected':
        case 'cellTypeCluster.menu.irrelevant':
        case 'cellTypeCluster.menu.sorting':
            return {
                ...state,
                menu: false
            }
        case 'cellTypeCluster.menu.open':
            return {
                ...state,
                menu: action.value
            }
        case 'cellTypeCluster.select.begin':
        case 'cellTypeCluster.select.reorder':
        case 'cellTypeCluster.select.reselect':
            let val = parseInt(action.value, 10)
            return {
                ...state,
                select: [val, val]
            }
        case 'cellTypeCluster.select.deselect':
        case 'cellTypeCluster.select.optionSelected':
            return {
                ...state,
                select: null
            }
        case 'cellTypeCluster.select.end':
            return {
                ...state,
                select: [state.select[0], parseInt(action.value, 10)]
            }
        case 'cellTypeCluster.selectInfo.set':
            return {
                ...state,
                selectInfo: action.value
            }
        default:
            return state
        }
    }

export default State
