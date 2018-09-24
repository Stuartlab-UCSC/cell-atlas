
// The similarity map file selection, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'
import InputFile from 'input/InputFile'
import { ToggleGrid } from 'input/inputGrid'

const InputFileMatrixZero = ({ data }) => {
    return (
        <InputFile
            data={data}
            lastColumn={
                <ToggleGrid
                    id={data.id + '.zero'}
                    label='Zero-fill empty values'
                    checked={data.zero}
                    tooltip={'Turn this on to fill any empty values in this ' +
                        'full matrix with zeroes'}
                />
            }
        />
    )
}

InputFileMatrixZero.propTypes = {
    data: PropTypes.object.isRequired,  // values associated with this instance
}

export default InputFileMatrixZero;

