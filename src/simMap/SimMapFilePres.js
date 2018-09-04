
// The similarity map file selection, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'

import FileSelect from 'components/FileSelect'

const File = ({ advanced, info, label, onChange, onSummaryClick }) => {
    
    const comp =
        <div style={{marginBottom: '1rem'}}>
            <FileSelect
                id={info.id}
                list={info.list}
                listValue={info.listValue}
                urlValue={info.urlValue}
                label={label}
                defaultExpanded={info.show}
                onChange={onChange}
                onSummaryClick={onSummaryClick}
                gridColumnWidth={6}
            />
        </div>
    return comp
}

const SimMapFilePres = ({ advanced, feature, metadata, onChange,
    onSummaryClick }) => (
    
    <div>
        <File
            label='LayoutFeatures *'
            advanced={advanced}
            info={feature}
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
    // Required
    feature: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    // Not required
    advanced: PropTypes.bool,
    onSummaryClick: PropTypes.func,
}

export default SimMapFilePres;
