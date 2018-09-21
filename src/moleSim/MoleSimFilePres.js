
// Molecular similarity map file selection: presentation

import PropTypes from 'prop-types'
import React from 'react'
import InputFile from 'inputFile/InputFile'
import InputFileMatrixZero from 'inputFile/InputFileMatrixZero'

const MoleSimFilePres = ({ feature, metadata, zero, onChange,
    onZeroChange, onSummaryClick }) => {
    
    return (
        <div>
            <InputFileMatrixZero
                data={feature}
                zero={zero}
                gridSize={4}
                onChange={onChange}
                onZeroChange={onZeroChange}
                onSummaryClick={onSummaryClick}
            />
            <InputFile
                data={metadata}
                gridSize={4}
                onChange={onChange}
                onSummaryClick={onSummaryClick}
            />
        </div>
    )
}

MoleSimFilePres.propTypes = {
    feature: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    zero: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onSummaryClick: PropTypes.func,
    onZeroChange: PropTypes.func,
}

export default MoleSimFilePres;
