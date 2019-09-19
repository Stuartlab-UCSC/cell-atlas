
// This contains routines to handle the drag and drop
// to re-order sortable elements.
// Note there are direct DOM style manipulations here, so we don't slow
// down the user experience when dragging the mouse.

import React from 'react'
import { get as rxGet, set as rxSet } from 'state/rx'

const SortableMarker = () => {
    // The marker showing the drop insertion point while dragging.
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
    // If the mouse position is outside of the sortable,
    // return the closest position.
    if (!ev.target.dataset || !ev.target.dataset.domain
        || ev.target.dataset.domain !== drag.domain) {
        const diff = (drag.xOrY === 'x')
            ? ev.pageX - drag.pageCoord
            : ev.pageY - drag.pageCoord
        position = (diff < 0) ? 0 : drag.count - 1
    } else {
        // The mouse is on an element in the sortable,
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
        // Reorder the elements in the sortable.
        drag.reorderFx(drag.position, position)
    }
    // Reset the drag state.
    rxSet('sortable.drag.mouseUp')
}

const sortableOnMouseMove = (ev, count, domain, marker, reorderFx, xOrY,
    dispatch) => {
    // Initialize the dragging on the first mouse drag event.
    // Show the body cursor as grabbing.
    // The caller should not call this if state.sortable.drag.active.
    document.body.style.cursor = 'grabbing'

    // Listen for a mouseUp event anywhere.
    document.body.addEventListener('mouseup', onMouseUp)

    // Initialize the sortable info and flag sorting as active.
    dispatch({
        type: 'sortable.drag.firstMouseMove',
        value: {
            active: true,
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

const sortableOnMouseOver = (ev, dispatch, boundsIn) => {
    // If we're sorting, handle the mouse entering a new element of interest.
    // Set the dimensions of the drag marker for the new element.
    // The bounds is optional and if not supplied it will be calculated using
    // the event target. This option is used in the case of a selection
    // including multiple elements.
    const drag = rxGet('sortable.drag')
    let bounds = boundsIn
    if (!bounds) {
        bounds = ev.target.getBoundingClientRect()
    }
    showMarker(bounds.bottom, bounds.left, drag.marker)
}

// State.
const defaultDrag = {
    active: false,  // true on the first mouse drag event
    count: null, // the number of positions in the sortable
    domain: null, // the domain of the elements being reordered
    pageCoord: null, // the X or Y page coordinate of the mouse move
    position: null, // the first position index on first mouse move
    reorderFx: null, // the function to call to reorder the elements
    xOrY: null,  // the relevant coordinate depending on orientation
    marker: null, // the transient element indicating the drop target
}
const State = (
    state = {
        drag: defaultDrag,
    }, action) => {
        switch(action.type) {
        case 'sortable.drag.firstMouseMove':
            return {
                ...state,
                drag: action.value
            }
        case 'sortable.drag.mouseUp':
            return {
                ...state,
                drag: defaultDrag
            }
        default:
            return state
        }
    }

export { SortableMarker, sortableOnMouseMove, sortableOnMouseOver, State }
