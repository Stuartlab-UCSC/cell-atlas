
// This contains routines to handle the drag and drop
// to re-order sortable elements.
// Note there are direct DOM style manipulations here, so we don't slow
// down the user experience when dragging the mouse.

import React from 'react'
import { get as rxGet, set as rxSet } from 'state/rx'
import { clearContextElements } from 'cellTypeWork/worksheet'

const SortableMarker = () => {
    return (
        <div
            id='sortable_drop_marker'
            style = {{
                background: 'black',
                width: 0,
                height: 0,
                position: 'fixed',
            }}
        />
    )
}

const resetMarker = () => {
    const marker = document.getElementById('sortable_drop_marker')
    marker.style.width = '0px'
    marker.style.height = '0px'
    marker.style.transform = 'none'
}

const showMarker = (top, left, dim) => {
    const marker = document.getElementById('sortable_drop_marker')
    marker.style.top = (top + dim.topOffset) + 'px'
    marker.style.left = (left + dim.leftOffset) + 'px'
    marker.style.width = dim.width
    marker.style.height = dim.height
    if (dim.transform) {
        marker.style.transform = dim.transform
    }
}

const currentPosition = (ev) => {
    // Determine the current position index in the domain.
    const drag = rxGet('sortable.drag')
    let position = null
    // If the mouse position is outside of the domain,
    // return the closest position. This picks the left-most or right-most for
    // horizontal domains and top-most or bottom-most for vertical domains.
    if (!ev.target.dataset || !ev.target.dataset.domain
        || ev.target.dataset.domain !== drag.domain) {
        const diff = (drag.xOrY === 'x')
            ? ev.pageX - drag.pageCoord
            : ev.pageY - drag.pageCoord
        position = (diff < 0) ? 0 : drag.count - 1
    } else {
        // The mouse is on an element in the domain,
        // so find the dragging element's new position if dropped now.
        position = parseInt(ev.target.dataset.position, 10)
        // If needed, adjust the insertion position to what it would be
        // after the element is removed prior to insertion.
        if (position > drag.position) {
            position -= 1
        }
    }

    return { position, drag }
}

const onMouseUp = (ev) => {
    // End the dragging no matter where the mouse is.
    document.body.removeEventListener('mouseup', onMouseUp)
    resetMarker()
    
    // Reset the body cursor.
    document.body.style.cursor = 'default'

    // If the mouse came up over any position other than the start position...
    const { position, drag } = currentPosition(ev)
    if (position !== drag.position) {
        // Reorder the elements in the domain.
        drag.reorderFx(drag.position, position)
    }
    // Reset the drag state.
    rxSet('sortable.drag.mouseUp')
}

const sortableOnMouseDown = (ev, count, domain, marker, reorderFx, xOrY,
    dispatch) => {
    
    // Show the body cursor as grabbing.
    document.body.style.cursor = 'grabbing'

    // Listen for a mouseUp event anywhere.
    document.body.addEventListener('mouseup', onMouseUp)

    // Save the column of where the mouse was pressed down, and more.
    dispatch({
        type: 'sortable.drag.mouseDown',
        value: {
            active: (count > 0),
            count,
            domain,
            marker,
            pageCoord: xOrY === 'x' ? ev.pageX : ev.pageY,
            position: parseInt(ev.target.dataset.position, 10),
            reorderFx,
            xOrY,
        }
    })
}

const sortableOnMouseOver = (ev, dispatch, hoverStateType) => {
    // If we're sorting, handle the drag event.
    const drag = rxGet('sortable.drag')
    if (ev.buttons === 1 || ev.buttons === 3) {
        // Let everyone know the mouse is being dragged while down
        // and set the dimensions of the drag marker.
        clearContextElements()
        dispatch({ type: 'sortable.drag.active' })
        const bounds = ev.target.getBoundingClientRect()
        showMarker(bounds.bottom, bounds.left, drag.marker)
        
    // If there is something to handle a non-mouse drag...
    } else if (hoverStateType) {
        // The items are not being sorted and there is an alternate handling
        // for a mouseOver, so handle this with the alternate.
        dispatch({
            type: hoverStateType,
            position: ev.target.dataset.position
        })
    }
}

// State.
const defaultDrag = {
    active: false,  // set when there is a mouseOver with the mouse down
    count: null, // the number of elements in the domain
    domain: null, // the domain of the elements being reordered
    pageCoord: null, // the X or Y page coordinate of the mouseDown
    position: null, // the mouseDown position index within the domain
    reorderFx: null, // the function to call to reorder the elements
    xOrY: null,  // the relevant coordinate depending on domain orientation
    marker: null, // drop marker dimensions object
}
const State = (
    state = {
        drag: defaultDrag,
    }, action) => {
        switch(action.type) {
        case 'sortable.drag.active':
            let drag = {...state.drag, active: true}
            return {
                ...state,
                drag
            }
        case 'sortable.drag.mouseUp':
            return {
                ...state,
                drag: defaultDrag
            }
        case 'sortable.drag.mouseDown':
            return {
                ...state,
                drag: action.value
            }
        default:
            return state
        }
    }

export { SortableMarker, sortableOnMouseDown, sortableOnMouseOver, State }
