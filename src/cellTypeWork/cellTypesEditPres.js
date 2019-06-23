
// The presentational component for the cell type editing
// on the cell type worksheet page.

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const Input = ({ i, value, props }) => {
    // Only show the hovered-upon cell type input.
    const { showInput, onInputChange } = props
    if (showInput !== i) {
        return (null)
    }
    const { cellTypesHeight, cellTypeLength, colWidth, fontSize, geneWidth }
        = props.dims
    return (
        <input
            id='cellTypeWorkCellTypeEditInput'
            defaultValue={value}
            data-position={i}
            style={{
                position: 'absolute',
                top: cellTypesHeight - 56,
                left: geneWidth + (colWidth * i) - 13,
                height: 15,
                transform: 'rotate(-45deg)',
                width: cellTypeLength,
                fontSize: fontSize + 'px',
            }}
            onChange={onInputChange}
        />
    )
}

const CellTypesEdit = (props) => {
    // Show the appropriate input component.
    const { cellTypes, onClickAway } = props
    let inputs = []
    cellTypes.forEach((cellType, i) => {
        inputs.push( <Input key={i} i={i} value={cellType} props={props} /> )
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
