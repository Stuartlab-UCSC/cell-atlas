

// Trajectory similarity analysis file selection: presentation

import PropTypes from 'prop-types'
import React from 'react'
import InputFile from 'inputFile/InputFile'

const TrajSimFilePres = ({ cellXbranch, geneMatrixTransposed, featureMatrix,
    onChange, onSummaryClick }) => (
    
    <div>
        <InputFile
            data={cellXbranch}
            gridSize={4}
            onChange={onChange}
            onSummaryClick={onSummaryClick}
        />
        <InputFile
            data={geneMatrixTransposed}
            gridSize={4}
            onChange={onChange}
            onSummaryClick={onSummaryClick}
        />
        <InputFile
            data={featureMatrix}
            gridSize={4}
            onChange={onChange}
            onSummaryClick={onSummaryClick}
        />
    </div>
)

TrajSimFilePres.propTypes = {
    cellXbranch: PropTypes.object.isRequired, // data for this file selector
    geneMatrixTransposed: PropTypes.object.isRequired, // data for this file selector
    featureMatrix: PropTypes.object.isRequired, // data for this file selector
    onChange: PropTypes.func.isRequired, // on change of file value
    onSummaryClick: PropTypes.func.isRequired, // on click of collapsable icon
}

export default TrajSimFilePres;
