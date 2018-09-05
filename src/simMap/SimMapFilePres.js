
// The similarity map file selection, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import FileSelect from 'components/FileSelect'

const File = ({ advanced, info, label, zeroReplace,
    onChange, onSummaryClick }) => {
    
    const comp =
        <div style={{marginBottom: '1rem'}}>
            <FileSelect
                id={info.id}
                list={info.list}
                listValue={info.listValue}
                urlValue={info.urlValue}
                label={label}
                gridSize={4}
                thirdColumn={zeroReplace}
                thirdColumnGridSize={2}
                defaultExpanded={info.show}
                onChange={onChange}
                onSummaryClick={onSummaryClick}
            />
        </div>
    return comp
}

const ZeroReplace = (zeroReplace, onZeroReplaceChange) => {
    const comp =
        <React.Fragment>
            <Typography variant='caption'>
                Zero fill empty values
            </Typography>
            <Switch
                checked={zeroReplace}
                onChange={onZeroReplaceChange}
                value='zeroReplace'
            />
        </React.Fragment>
    return comp
}

const SimMapFilePres = ({ advanced, feature, metadata, zeroReplace, onChange,
    onZeroReplaceChange, onSummaryClick }) => (
    
    <div>
        <File
            label='LayoutFeatures *'
            advanced={advanced}
            info={feature}
            zeroReplace={ZeroReplace(zeroReplace, onZeroReplaceChange)}
            onChange={onChange}
            onSummaryClick={onSummaryClick}
        />
        <File
            label='Coloring metadata'
            advanced={advanced}
            info={metadata}
            onChange={onChange}
            onSummaryClick={onSummaryClick}
        />
    </div>
)

SimMapFilePres.propTypes = {
    advanced: PropTypes.bool,
    feature: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    zeroReplace: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onSummaryClick: PropTypes.func,
    onZeroReplaceChange: PropTypes.func,
}

export default SimMapFilePres;
