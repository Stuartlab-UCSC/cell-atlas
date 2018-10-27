
import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";

import heatmap from 'trajExplore/images/heatmap.png'

const Help = () => {
    return (
        <Grid container spacing={16}
              className='pageBody'
        >
            <Grid item xs={12}>
                <Typography variant='title'>
                    CyTraceDb Explorer
                </Typography>
            </Grid>
            <Grid item xs={12}>
            <img
                src={heatmap}
                alt={heatmap}
                height={500}
            />
            </Grid>


        </Grid>
    )
}

export default Help
