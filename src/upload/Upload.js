
// The upload page.

import React from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography';

import UploadFile from 'upload/UploadFile'
import UploadFormat from 'upload/UploadFormat'
import UploadTable from 'upload/UploadTable'

const UploadPres = ({classes}) => {
    return (
        <div className='uploadPage pageBody'>
            <Typography
                variant='title'
                style={{ marginBottom: '1rem' }}
            >
                Upload Files
            </Typography>
            <UploadFile />
            <UploadFormat />
            <UploadTable />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        classes: {
            title: 'title',
        },
    }
}

const Upload = connect(
    mapStateToProps
)(UploadPres)

export default Upload
