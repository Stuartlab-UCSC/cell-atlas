
// The upload page.

import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UploadFile from 'upload/UploadFile'
import UploadTransfer from 'upload/UploadTransfer'
import UploadFormat from 'upload/UploadFormat'
import UploadTable from 'upload/UploadTable'

/*
*/
const Upload = () => {
    return (
        <Grid container spacing={16}
            className='pageBody'
            style={{ maxWidth: '70rem'}}
        >
            <Grid item xs={12}>
                <Typography variant='title'>
                    Upload Files
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <UploadFile />
                <UploadTransfer />
            </Grid>
            <Grid item xs={12}>
                <UploadFormat />
            </Grid>
            <Grid item xs={12}>
                <UploadTable />
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant='caption'
                    style={{ marginTop: '1rem' }}
                >
                    TBD = To Be Determined
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Upload
