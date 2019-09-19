
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
        case 'cellTypeBar.labelInput.irrelevant':
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
        case 'cellTypeBar.menu.deselected':
        case 'cellTypeBar.menu.groupedUngrouped':
        case 'cellTypeBar.menu.irrelevant':
        case 'cellTypeBar.menu.noValidOptions':
        case 'cellTypeBar.menu.sorting':
            return {
                ...state,
                menu: false
            }
        case 'cellTypeBar.menu.open':
            // Save the start and end groups and columns of the menu.
            return {
                ...state,
                menu: action.value
            }
        case 'cellTypeBar.select.begin':
        case 'cellTypeBar.select.reorder':
        case 'cellTypeBar.select.reselect':
            let val = parseInt(action.value, 10)
            return {
                ...state,
                select: [val, val]
            }
        case 'cellTypeBar.select.deselect':
        case 'cellTypeBar.select.groupedUngrouped':
            return {
                ...state,
                select: null
            }
        case 'cellTypeBar.select.end':
            return {
                ...state,
                select: [state.select[0], parseInt(action.value,10)]
            }
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
