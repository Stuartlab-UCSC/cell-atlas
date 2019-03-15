
// Home page.

import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'

import schema from 'images/schema.png'

const DataModel = () => {

    return (
        <Grid container spacing={16} >
            <Grid item xs={12}>
                <Typography variant='h6'>
                    Cluster Data Model
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <img
                    src={schema}
                    alt='schema'
                    height={400}
                />
            </Grid>
        </Grid>
    )
}

export default DataModel
