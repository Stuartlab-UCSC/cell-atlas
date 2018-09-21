
// The similarity map file selection, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import InputFile from 'inputFile/InputFile'

const ZeroReplace = (zero, onZeroChange) => {
    const comp =
        <React.Fragment>
            <Typography variant='caption'>
                Zero-fill empty values in matrix
            </Typography>
            <Switch
                checked={zero}
                onChange={onZeroChange}
                value='zero'
            />
        </React.Fragment>
    return comp
}

const InputFileMatrixZero = ({ data, gridSize, zero, onChange, onSummaryClick,
    onZeroChange }) => {

    return (
        <div>
            <InputFile
                data={data}
                thirdColumn={ZeroReplace(zero, onZeroChange)}
                gridSize={gridSize}
                onChange={onChange}
                onSummaryClick={onSummaryClick}
            />
        </div>
    )
}
InputFileMatrixZero.propTypes = {
    data: PropTypes.object.isRequired,  // values associated with this instance
    onChange: PropTypes.func.isRequired, // on file selection changing
    
    gridSize: PropTypes.number, // with rows being 12 units wide
    zero: PropTypes.bool, // true to zero-replace empty matrix values
    onSummaryClick: PropTypes.func, // clicked on the header of collapsable
    onZeroChange: PropTypes.func, // zero-replace was toggled
}

export default InputFileMatrixZero;

