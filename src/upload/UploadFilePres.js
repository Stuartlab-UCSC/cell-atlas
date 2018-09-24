
// Select files for upload, the presentation component.

import PropTypes from 'prop-types'
import React from 'react'

import Button from '@material-ui/core/Button'

const FileInput = ({ id, label, marginRight, onChange }) => {

    let buttonStyle = null
    if (marginRight) {
        buttonStyle = { marginRight: marginRight }
    }
    const comp =
    <React.Fragment>
        <input
            id={id}
            multiple
            type='file'
            style={{ display: 'none' }}
            onChange={onChange}
        />
        <label htmlFor={id}>
            <Button
                variant='contained'
                component='span'
                color='primary'
                style={buttonStyle}
            >
                {label}
            </Button>
        </label>
    </React.Fragment>

    return comp
}

FileInput.propTypes = {
    id: PropTypes.string.isRequired,    // unique identifier
    label: PropTypes.string.isRequired, // text to appear on button
    marginRight: PropTypes.string,      // size of right margin, like '1rem'
    onChange: PropTypes.func,           // function to call on file selection
}

const UploadFilePres = ({ onChange }) => {

    return (
        <React.Fragment>
            <FileInput
                id='uploadFeature'
                label='Features'
                marginRight='2rem'
                onChange={onChange}
            />
            <FileInput
                id='uploadMetadata'
                label='Metadata'
                onChange={onChange}
            />
        </React.Fragment>
    )
}

UploadFilePres.propTypes = {
    onChange: PropTypes.func, // function to call on file selection
}

export default UploadFilePres;
