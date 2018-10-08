
// Select files for upload, the presentation component.

import PropTypes from 'prop-types'
import React from 'react'

import Button from '@material-ui/core/Button'

const UploadFilePres = ({ onChange }) => {

    const id = 'uploadFile'
    const buttonStyle = { marginRight: '2rem' }
    return (
        <React.Fragment>
            <input
                id={id}
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
                    Select File
                </Button>
            </label>
        </React.Fragment>
    )
}

UploadFilePres.propTypes = {
    onChange: PropTypes.func, // function to call on file selection
}

export default UploadFilePres;
