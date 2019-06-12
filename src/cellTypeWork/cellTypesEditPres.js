
// The presentational component for the cell type editing
// on the cell type worksheet page.

import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import { DOMAIN } from 'cellTypeWork/cellTypes'

const Button = ({ i, dims, onClick, onMouseOver, onMouseLeave }) => {
    // The edit button for a cell type.
    const { colWidth } = dims
    return (
        <IconButton
            id='cellTypeWorkCellTypeEditButton'
            data-domain={DOMAIN}
            data-editmode={true}
            data-position={i}
            style={{
                position: 'absolute',
                top: -15,
                left: 80 + (colWidth * i),
            }}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            <EditIcon
                data-position={i}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            />
        </IconButton>
    )
}

const Input = ({ i, value, dims, onBlur, onChange }) => {
    // The text input box for a cell type.
    const { cellTypeLength, colWidth, fontSize } = dims
    return (
        <input
            defaultValue={value}
            data-domain={DOMAIN}
            data-editmode={true}
            data-position={i}
            style={{
                position: 'absolute',
                top: 45,
                left: (colWidth * i),
                transform: 'rotate(-45deg)',
                width: cellTypeLength,
                fontSize: fontSize + 'px',
            }}
            onBlur={onBlur}
            onChange={onChange}
        />
    )
}

const CellTypesEdit = (props) => {
    // Show the appropriate button or input.
    const { showInput, showButton, cellTypes, onChange, onClick, onBlur,
        onMouseOverButton, onMouseLeaveButton } = props
    if (showInput === null && showButton === null) {
        return (null)
    }
    const { geneWidth } = props.dims
    let edit = null
    cellTypes.forEach((cellType, i) => {
        if (showInput === i) {
            edit = (
                <Input
                    key={i}
                    i={i}
                    value={cellType}
                    dims={props.dims}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            )
        } else if (showButton === i) {
            edit = (
                <Button
                    key={i}
                    i={i}
                    dims={props.dims}
                    onClick={onClick}
                    onMouseOver={onMouseOverButton}
                    onMouseLeave={onMouseLeaveButton}
                />
            )
        }
    })
    return (
        <div
            style={{
                position: 'absolute',
                left: geneWidth - 15,
                top: 0,
            }}
        >
            {edit}
        </div>
    )
}

export default CellTypesEdit
