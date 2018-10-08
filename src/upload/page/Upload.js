
// The upload page.

import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextFieldGrid } from 'input/inputGrid';
import UploadFile from 'upload/page/UploadFile'
import UploadTransfer from 'upload/page/UploadTransfer'
import UploadFormat from 'upload/page/UploadFormat'
import UploadTable from 'upload/page/UploadTable'

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
                    Upload Analysis Input Files
                </Typography>
            </Grid>
            <UploadFormat />
            <Grid item xs={4}>
                <TextFieldGrid
                    id={id + '.project'}
                    label='Project'
                    defaultValue={project}
                    tooltip='An optional project name to organize your data'
                    style={{marginTop: '-1rem'}}
                />
            </Grid>
            <Grid item xs={12}>
                <UploadFile />
                <UploadTransfer />
            </Grid>
            <Grid item xs={12}>
                <UploadTable />
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant='caption'
                    style={{ marginTop: '1rem' }}
                >
                    <p>* Required</p>
                    <p>TBD = To Be Determined</p>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Upload
