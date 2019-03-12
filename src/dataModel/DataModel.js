
// Home page.

import React from 'react';
import { Redirect } from 'react-router-dom'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'

import schema from 'images/schema.png'

const pageBodyStyle = {
    paddingLeft: '1rem',
    paddingRight: '0rem',
    paddingBottom: '1rem',
}

const DataModel = () => {

    return (
        <Grid container spacing={16}
            className='pageBody'
        >
            <Grid item xs={12}>
                <Typography variant='title'>
                    Cluster Data Model
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <img
                    src={schema}
                    alt='schema'
                    height={300}
                />
            </Grid>
        </Grid>
    )
}

export default DataModel
