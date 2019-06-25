// The logic for the clusters and their info on the cell type worksheet.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import Presentation from 'cellTypeWork/colorBarPres'
import dataStore from 'cellTypeWork/dataStore'
import { clearContextElements } from 'cellTypeWork/worksheet'

const DOMAIN = 'cellTypeWorkColorBar'

const mapStateToProps = (state) => {
    // Find the position stored in the colormapPicker state.
    const showPicker = state.cellTypeWork.colormapPicker
    let startColor = null
    // Set the starting colorPicker color to that at colormap[index].
    const colorBar = dataStore.getColorBar()
    if (showPicker !== null) {
        startColor = colorBar[showPicker]
    }
    return {
        showPicker,
        colorBar,
        colormap: state.cellTypeWork.colormap,
        dims: state.cellTypeWork.dims,
        render: state.cellTypeWork.render,
        startColor,
    }
}

const onColorChange = (ev, color) => {
    // Update the colormap index of the colorBar segment.
    // This event is propagated from the body onMouseUp handler, rather than
    // directly from the color picker's onColorChangeComplete event.
    dataStore.setColorBar(
        rxGet('cellTypeWork.colormapPicker'),
        color.hex,
        rxGet('cellTypeWork.colormap'),
    )
    rxSet('cellTypeWork.render.now')
    // Hide the color picker.
    rxSet('cellTypeWork.colormapPicker.hide')
}

const onMouseUp = (ev) => {
    document.body.removeEventListener('mouseup', onMouseUp)
    // If the mouse is let up over a color in the color Picker, call the color
    // picker handler. The color picker conveniently sets the title of the
    // picker color element to the color picked in hex format.
    let title = ev.target.title
    if (title && title.slice(0, 1) === '#') {
        onColorChange(ev, {hex: title})
    } else {
        // Hide the color picker.
        rxSet('cellTypeWork.colormapPicker.hide')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseOver: ev => {
            // Clear any leftover context elements.
            clearContextElements(DOMAIN)
        },
        onBarClick: ev => {
            dispatch({
                type: 'cellTypeWork.colormapPicker.show',
                value: ev.target.dataset.position,
            })
            // Listen for a mouseUp event anywhere except on the color picker
            // so that we can close the color picker if the user decides not
            // to change the color.
            document.body.addEventListener('mouseup', onMouseUp)
        },
    }
}

const ColorBar = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default ColorBar
