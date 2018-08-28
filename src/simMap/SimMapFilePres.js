
// Create map, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'

import FileSelect from 'components/FileSelect'

const File = ({ advanced, info, classes, linkTo, onSummaryClick,
    onChange }) => {
    
    const comp =
        <div style={{marginBottom: '1rem'}}>
            <FileSelect
                id={info.id}
                list={info.list}
                listValue={info.listValue}
                urlValue={info.urlValue}
                show={info.show}
                classes={classes}
                onChange={onChange}
                gridColumnWidth={6}
                linkTo={linkTo}
                growPanel={{
                    label: info.label,
                    classes: {
                        icon: 'icon',
                        summary: 'summary',
                        summaryText: 'summaryText',
                        details: 'details',
                    },
                    onClick: onSummaryClick,
                }}
            />
        </div>
    return comp
}

const SimMapFilePres = ({ advanced, feature, metadata, classes, onSummaryClick,
    onChange }) => (
    
    <div>
        <File
            advanced={advanced}
            info={feature}
            classes={classes}
            onSummaryClick={onSummaryClick}
            onChange={onChange}
        />
        <File
            advanced={advanced}
            info={metadata}
            classes={classes}
            onSummaryClick={onSummaryClick}
            onChange={onChange}
        />
    </div>
)

SimMapFilePres.propTypes = {
    advanced: PropTypes.bool,
    feature: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    onSummaryClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SimMapFilePres;
