
// This contains routines to handle the drag and drop
// to re-order sortable elements.

import React from 'react'
import { get as rxGet, set as rxSet } from 'state/rx'

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
    // If there is no drag information in the element's data,
    // return the closest position.
    if (!ev.target.dataset || !ev.target.dataset.domain
        || ev.target.dataset.domain !== drag.domain) {
        const diff = (drag.xOrY === 'x')
            ? ev.pageX - drag.pageCoord
            : ev.pageY - drag.pageCoord
        position = (diff < 0) ? 0 : drag.count - 1
    } else {
        // The mouse is on an element in the domain.
        position = ev.target.dataset.position
         if (position > drag.position) {
            position -= 1
        }
    }
    return { position, drag }
}

const removeOnMouseUp = () => {
    document.body.removeEventListener('mouseup', onMouseUp)
}

const onMouseUp = (ev) => {
    // End the dragging no matter where the mouse is.
    removeOnMouseUp()
    resetMarker()
    document.body.style.cursor = 'default'
    
    // If the mouse is over the same element as on mouseDown, we're done.
    const { position, drag } = currentPosition(ev)
    if (position === drag.position) {
        return
    }

    // Reorder the domain.
    drag.reorderFx(drag.position, position)

    // Reset the drag state.
    rxSet('sortable.drag.mouseUp')
}

const sortableOnMouseDown = (ev, count, domain, marker, reorderFx, xOrY,
    dispatch) => {
    // Show the cursor as grabbing.
    document.body.style.cursor = 'grabbing'
    ev.target.style.cursor = 'grabbing'

    // Listen for a mouseUp event anywhere.
    document.body.addEventListener('mouseup', onMouseUp)

    // Save the column of where the mouse was pressed down, and more.
    dispatch({
        type: 'sortable.drag.mouseDown',
        value: {
            count,
            domain,
            marker,
            pageCoord: ev.pageX,
            position: ev.target.dataset.position,
            reorderFx,
            xOrY,
        }
    })
}

const sortableOnMouseLeave = (ev) => {
    const drag = rxGet('sortable.drag')
    if (!drag.domain || ev.target.dataset.domain !== 'cellTypes') {
        // We're not dragging the mouse, or we're in some other sortable domain.
        return
    }
    resetMarker()
    ev.target.style.cursor = 'grab'
}

const sortableOnMouseOver = (ev) => {
    const drag = rxGet('sortable.drag')
    if (drag.domain === null
        || drag.domain !== ev.target.dataset.domain) {
        return
    }
    // Set the dimensions of the drag marker.
    const bounds = ev.target.getBoundingClientRect()
    showMarker(bounds.bottom, bounds.left, drag.marker)
    ev.target.style.cursor = 'grabbing'
}

// State.
const defaultDrag = {
    count: null, // the number of elements in the domain
    domain: null, // the domain of the elements being reordered
    pageCoord: null, // the X or Y page coordinate of the mouseDown
    position: null, // the mouseDown position index within the domain
    reorderFx: null, // the function to call to reorder the elements
    xOrY: null,  // the relevant coordinate depending on domain orientation
    marker: null, // drop marker dimensions
}

const State = (
    state = {
        drag: defaultDrag,
    }, action) => {
        switch(action.type) {
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

export { SortableMarker, sortableOnMouseDown, sortableOnMouseLeave,
    sortableOnMouseOver, State }

