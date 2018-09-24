
// The upload page.

import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextFieldGrid } from 'input/inputGrid';
import UploadFile from 'upload/UploadFile'
import UploadTransfer from 'upload/UploadTransfer'
import UploadFormat from 'upload/UploadFormat'
import UploadTable from 'upload/UploadTable'

/*
*/
const Upload = ({ project }) => {
    const id = 'upload'
    return (
        <Grid container spacing={24}
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
            <Grid item xs={4}>
                <TextFieldGrid
                    id={id + '.project'}
                    label='Project'
                    defaultValue={project}
                    tooltip='An optional project name to organize your data'
                />
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
