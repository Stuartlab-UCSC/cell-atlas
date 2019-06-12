
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
        <React.Fragment>
            <IconButton
                data-domain={DOMAIN}
                data-editmode={true}
                data-position={i}
                style={{
                    position: 'absolute',
                    top: -15,
                    left: 80 + (colWidth * i),
                    zIndex: 1000000,
                }}
                onClick={onClick}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            >
                <EditIcon
                    onMouseOver={onMouseOver}
                    onMouseLeave={onMouseLeave}
                />
            </IconButton>
        </React.Fragment>
    )
}

const Input = ({ i, value, dims }) => {
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
                left: (colWidth * i),
                top: 23,
                transform: 'rotate(-45deg)',
                width: cellTypeLength,
                fontSize: fontSize + 'px',
            }}
        />
    )
}

const CellTypesEdit = (props) => {
    // Show the appropriate button or input.
    const { showInput, showButton, cellTypes, onClick, onMouseOverButton,
        onMouseLeaveButton } = props
    if (showInput === null && showButton === null) {
        return (null)
    }
    const { geneWidth } = props.dims
    let edit = null
    cellTypes.forEach((cellType, i) => {
        if (showButton === i) {
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
        } else if (showInput === i) {
            edit = (
                <Input
                    key={i}
                    i={i}
                    value={cellType}
                    dims={props.dims}
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
