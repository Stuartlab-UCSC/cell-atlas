
// The presentational component for the cell type editing
// on the cell type worksheet page.

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const Input = ({ i, value, props }) => {
    // Only show the hovered-upon cell type input.
    const { showInput, onInputChange, onMouseOver } = props
    const { cellTypesHeight, cellTypeLength, colWidth, fontSize, geneWidth }
        = props.dims
    const style = {
        position: 'absolute',
        top: cellTypesHeight - 63,
        left: geneWidth + (colWidth * i) - 22,
        height: fontSize + 4,
        transform: 'rotate(-45deg)',
        width: cellTypeLength,
        fontSize: fontSize + 'px',
    }

    // If the mouse is over the field, show an input field.
    if (showInput === i) {
        return (
            <input
                id='cellTypeWorkCellTypeEditInput'
                defaultValue={value}
                data-position={i}
                style={style}
                onChange={onInputChange}
            />
        )
    }
    // If the mouse is not over the field, just show a mouse-over target.
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
            value={cellType.hide ? null : cellType.label}
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
