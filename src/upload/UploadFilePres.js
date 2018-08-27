
// Select files for upload, the presentation component.

import PropTypes from 'prop-types'
import React from 'react'

import Button from '@material-ui/core/Button'

const UploadFilePres = ({ onChange} ) => (
    <React.Fragment>
        <input
            id='feature'
            multiple
            type='file'
            style={{ display: 'none' }}
            onChange={onChange}
        />
        <label htmlFor='feature'>
            <Button
                variant='contained'
                component='span'
                color='primary'
                style={{ marginBottom: '1rem', marginRight: '1rem' }}
            >
            FEATURES
            </Button>
        </label>
        <input
            id='metadata'
            multiple
            type='file'
            style={{ display: 'none' }}
            onChange={onChange}
        />
        <label htmlFor='metadata'>
            <Button
                variant='contained'
                component='span'
                color='primary'
                style={{ marginBottom: '1rem' }}
            >
            METADATA
            </Button>
        </label>
    </React.Fragment>
)

UploadFilePres.propTypes = {
    onChange: PropTypes.func,
}

export default UploadFilePres;
