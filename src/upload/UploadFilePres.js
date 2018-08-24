
// Select files for upload, the presentation component.

import PropTypes from 'prop-types'
import React from 'react'

import Button from '@material-ui/core/Button'

const UploadFilePres = ({ onChange} ) => (
    <React.Fragment>
        <input
            id='uploadFileInput'
            multiple
            type='file'
            style={{ display: 'none' }}
            onChange={onChange}
        />
        <label htmlFor='uploadFileInput'>
            <Button
                variant='contained'
                component='span'
                color='primary'
                style={{ marginBottom: '1rem' }}
            >
            SELECT FILES
            </Button>
        </label>
    </React.Fragment>
)

UploadFilePres.propTypes = {
    onChange: PropTypes.func,
}

export default UploadFilePres;
