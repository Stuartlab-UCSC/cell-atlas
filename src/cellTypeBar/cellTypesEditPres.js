
// The presentational component for the cell type editing
// on the cell type worksheet page.

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const Input = ({ i, label, show, props }) => {
    // Only show the hovered-upon cell type input.
    const { position, onInputChange, onMouseLeave, onMouseOver } = props
    const { cellTypesHeight, cellTypeLength, colWidth, fontSize, geneWidth }
        = props.dims
    const style = {
        position: 'absolute',
        top: cellTypesHeight - 68, //63,
        left: geneWidth + (colWidth * i) - 20, //22,
        height: fontSize + 4,
        transform: 'rotate(-45deg)',
        width: cellTypeLength,
        fontSize: fontSize + 'px',
    }

    // If the mouse is over the this label, show an input field.
    if (show && position === i) {
        return (
            <input
                id='cellTypeBarLabelInput'
                defaultValue={label}
                data-position={i}
                style={style}
                onChange={onInputChange}
                onMouseLeave={onMouseLeave}
            />
        )
    }
    
    // If the mouse is not over the field, just show a mouseOver target so
    // we can capture the mouseOver event.
    return (
        <div
            data-position={i}
            style={style}
            onMouseOver={onMouseOver}
        />
    )
}

const CellTypesEdit = (props) => {
    // Show the appropriate input component.
    const { cellTypes, onClickAway } = props
    let inputs = []
    cellTypes.forEach((cellType, i) => {
        inputs.push(
            <Input key={i}
            i={i}
            label={cellType.label}
            show={cellType.show}
            props={props}
        /> )
    })
    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <div>
                {inputs}
            </div>
        </ClickAwayListener>
    )
}

export default CellTypesEdit
