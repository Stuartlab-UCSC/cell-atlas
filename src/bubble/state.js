
// Gene page state.

//const defaultSort = { column: 'color', direction: 'descending' }

const State = (
    state = {
        colorColumnTooltip: null,
        tooltip: null,
    }, action) => {
        switch(action.type) {
        case 'bubble.colorColumnTooltip.mouseOut':
            return {
                ...state,
                colorColumnTooltip: null
            }
        case 'bubble.colorColumnTooltip.mouseOver':
            return {
                ...state,
                colorColumnTooltip: action.value
            }
        case 'bubble.tooltip.mouseOut':
            return {
                ...state,
                tooltip: null
            }
        case 'bubble.tooltip.mouseOver':
            return {
                ...state,
                tooltip: action.value
            }
        default:
            return state
        }
    }

export default State
