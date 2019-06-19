
// The presentational component for the cell type editing
// on the cell type worksheet page.

import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { DOMAIN } from 'cellTypeWork/cellTypes'


const EditButton = ({props}) => {
    // The cell type button.
    const { clusterCount, onButtonClick } = props
    const { cellTypesHeight, colWidth, fontSize, geneWidth } = props.dims
    return (
        <Button
            id='cellTypeWorkCellTypeButton'
            variant='outlined'
            size='small'
            color='primary'
            style={{
                position: 'absolute',
                top: cellTypesHeight - 30,
                left: geneWidth + (colWidth * clusterCount) + 20,
                fontSize: fontSize,
            }}
            onClick={onButtonClick}
        >
            Edit
        </Button>
    )
}

const SelectMessage = ({props}) => {
    // The select cell type message.
    const { clusterCount } = props
    const { cellTypesHeight, colWidth, geneWidth } = props.dims
    return (
        <Typography
            id='cellTypeWorkCellTypeButton'
            color='primary'
            style={{
                position: 'absolute',
                top: cellTypesHeight - 24,
                left: geneWidth + (colWidth * clusterCount) + 20,
            }}
        >
            Click Cell Type
        </Typography>
    )
}

const Input = ({ i, value, dims, onInputChange }) => {
    // The text input box for a cell type.
    const { cellTypesHeight, cellTypeLength, colWidth, fontSize, geneWidth }
        = dims
    return (
        <input
            id='cellTypeWorkCellTypeEditInput'
            defaultValue={value}
            data-domain={DOMAIN}
            data-editmode={true}
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
    // Show the appropriate button or input.
    const { cellTypes, dims, mode, showButton, showInput,
        onInputChange } = props
    if (showInput === null && !showButton) {
        return (null)
    }
    let input = null
    if (showInput !== null) {
        cellTypes.forEach((cellType, i) => {
            if (showInput === i) {
                input = (
                    <Input
                        key={i}
                        i={i}
                        value={cellType}
                        dims={dims}
                        onInputChange={onInputChange}
                    />
                )
            }
        })
    }
    let button = null
    if (showButton) {
        if (mode === 'readOnly') {
            button = (
                <EditButton props={props} />
            )
        } else {
            button = (
                <SelectMessage props={props} />
            )
        }
    }
    return (
        <React.Fragment>
            {input}
            {button}
        </React.Fragment>
    )
}

export default CellTypesEdit
