
// Cell type labels and colorBar of the cell type workbench state.

const State = (
    state = {
        group: false,
        ungroup: false,
        labelInput: null,
        labelMode: 'readOnly',
        menu: false,
        select: null,
        selecting: false,
    }, action) => {
        switch(action.type) {
        case 'cellTypeBar.group.enable':
            return {
                ...state,
                group: true
            }
        case 'cellTypeBar.group.disable':
            return {
                ...state,
                group: false
            }
        case 'cellTypeBar.labelInput.hide':
            return {
                ...state,
                labelInput: null
            }
        case 'cellTypeBar.labelInput.show':
            // The cellType position is saved here.
            return {
                ...state,
                labelInput: parseInt(action.value, 10)
            }
        /*
        case 'cellTypeBar.menu.close':
            return {
                ...state,
                menu: false
            }
        case 'cellTypeBar.menu.open':
            // An array of true or false, one for each type group.
            return {
                ...state,
                menu: action.value
            }
        case 'cellTypeBar.select.begin':
            return {
                ...state,
                select: [parseInt(action.value, 10), parseInt(action.value,10)]
            }
        case 'cellTypeBar.select.clickAway':
            console.error('cellTypeBar.select.clickAway')
            return {
                ...state,
                select: null
            }
        case 'cellTypeBar.select.hide':
            return {
                ...state,
                select: null
            }
        case 'cellTypeBar.select.end':
            return {
                ...state,
                select: [state.select[0], parseInt(action.value,10)]
            }
        */
        case 'cellTypeBar.ungroup.enable':
            return {
                ...state,
                ungroup: true
            }
        case 'cellTypeBar.ungroup.disable':
            return {
                ...state,
                ungroup: false
            }
        default:
            return state
        }
    }

export default State
