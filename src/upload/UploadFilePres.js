
// Select files for upload, the presentation component.

import PropTypes from 'prop-types'
import React from 'react'

import Button from '@material-ui/core/Button'

const UploadFilePres = ({ onChange} ) => (
    <React.Fragment>
        <input
            id='uploadFeature'
            multiple
            type='file'
            style={{ display: 'none' }}
            onChange={onChange}
        />
        <label htmlFor='uploadFeature'>
            <Button
                variant='contained'
                component='span'
                color='primary'
                style={{ marginBottom: '1rem', marginRight: '1rem' }}
            >
                Features
            </Button>
        </label>
        <input
            id='uploadMetadata'
            multiple
            type='file'
            style={{ display: 'none' }}
            onChange={onChange}
        />
        <label htmlFor='uploadMetadata'>
            <Button
                variant='contained'
                component='span'
                color='primary'
                style={{ marginBottom: '1rem' }}
            >
                Metadata
            </Button>
        </label>
    </React.Fragment>
)

UploadFilePres.propTypes = {
    onChange: PropTypes.func,
}

export default UploadFilePres;
