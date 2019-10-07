
// Cell type labels and colorBar of the cell type workbench state.

const State = (
    state = {
        labelInput: null,
        labelMode: 'readOnly',
        menu: false,
    }, action) => {
        switch(action.type) {
        case 'cellTypeBar.labelInput.close':
        case 'cellTypeBar.labelInput.irrelevant':
            return {
                ...state,
                labelInput: null
            }
        case 'cellTypeBar.labelInput.open':
            // The cellType position is saved here.
            return {
                ...state,
                labelInput: parseInt(action.value, 10)
            }
        case 'cellTypeBar.menu.clickAway':
        case 'cellTypeBar.menu.optionSelected':
        case 'cellTypeBar.menu.irrelevant':
        case 'cellTypeBar.menu.noValidOptions':
        case 'cellTypeBar.menu.sorting':
            return {
                ...state,
                menu: false
            }
        case 'cellTypeBar.menu.open':
            return {
                ...state,
                menu: action.value
            }
        default:
            return state
        }
    }

export default State
