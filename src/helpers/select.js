
// Selection helpers for a list of widgets with selection capability.

import { rxGet } from 'state/rx'

const findBorder = (select, i) => {
    // If this widget is in the range of the selection, set its borders.
    // A selection may be a single widget or a range of widgets.
    // @param select: the selected widgets in the form [beginIndex, endIndex]
    // @param i: the index of this widget in its list
    const border = 'solid 1px #888'
    const sBorder = 'solid 2px #000'
    let bTop = null
    let bBottom = null
    let bLeft = (i > 0) ? border : null
    let bRight = null
    if (select) {
        if (select[0] <= select[1]) {
        // The first index is the begin widget.
            if (i >= select[0] && i <= select[1]) {
                // This widget is within the selection.
                bTop = sBorder
                bBottom = sBorder
                if (i === select[0]) {
                    bLeft = sBorder
                }
                if (i === select[1]) {
                    bRight = sBorder
                }
            }
        // The last index is the begin widget.
        } else if (i >= select[1] && i <= select[0]) {
            // This widget is within the selection.
            bTop = sBorder
            bBottom = sBorder
            if (i === select[1]) {
                bLeft = sBorder
            }
            if (i === select[0]) {
                bRight = sBorder
            }
        }
    }
    return { bTop, bBottom, bLeft, bRight }
}

const onSelectClick = (ev, domain, dispatch) => {
    // This is a click for select or deselect.
    // This is only hit on a click without the mouse held down.
    // This requires some domain-specific state to be there.
    // @param position: the index of the widget
    // @param shiftKey: true means the shift key was down during the click
    // @param domain: the domain of this selection
    // @param dispatch: the usual to update state
    const position = parseInt(ev.target.dataset.position, 10)
    const select = rxGet(domain + '.select')

    if (ev.shiftKey) {
        // Save the end position of the selection,
        // if there is already a selection.
        if (select !== null) {
            dispatch({
                type: domain + '.select.end',
                value: position,
            })
        }
        
    } else if (select === null) {
        // With no current selection, save the begin position.
        dispatch({
            type: domain + '.select.begin',
            value: position,
        })
        
    } else if (position >= Math.min(select[0], select[1])
        && position <= Math.max(select[0], select[1])) {
        // A click on the current selection, so deselect it.
        dispatch({ type: domain + '.select.deselect' })
        
    } else {
        // A click outside of the current selection,
        // so select this new group.
        dispatch({
            type: domain + '.select.reselect',
            value: position
        })
    }
}

export { findBorder, onSelectClick }
