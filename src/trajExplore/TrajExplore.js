
import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";

import heatmap from 'trajExplore/images/heatmap.png'

const TrajExplore = () => {
    return (
        <Grid container spacing={16} >
            <Grid item xs={12}>
                <Typography variant='h6'>
                    Trajectory Algorithm Comparison
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

export default TrajExplore
