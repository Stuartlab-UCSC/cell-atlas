
// The upload page.

import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Email from 'components/Email'
import UploadFile from 'upload/UploadFile'
import UploadTransfer from 'upload/UploadTransfer'
import UploadFormat from 'upload/UploadFormat'
import UploadTable from 'upload/UploadTable'

const getEmail = () => {
    const comp =
        <Grid container
            style={{marginBottom: '1rem', marginLeft: '-1rem'}}
        >
            <Grid item xs={4}>
                <Email />
            </Grid>
        </Grid>
    return comp
}

const Upload = () => {
    return (
        <div
            className='uploadPage pageBody'
            style={{ maxWidth: '60rem'}}
        >
            <Typography
                variant='title'
                style={{ marginBottom: '1rem' }}
            >
                Upload Files
            </Typography>
            {getEmail()}
            <UploadFile />
            <UploadTransfer />
            <UploadFormat />
            <UploadTable />
            <Typography
                variant='caption'
                style={{ marginTop: '1rem' }}
            >
                TBD = To Be Determined
            </Typography>
        </div>
    )
}

export default Upload
