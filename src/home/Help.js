
import React from 'react'
import Grid from '@material-ui/core/Grid';
import MockUp from 'app/MockUp'
import Typography from "@material-ui/core/Typography/Typography";

const Help = () => {
    return (
        <Grid container spacing={16}
              className='pageBody'
        >
            <Grid item xs={12}>
                <Typography variant='title'>
                    Help
                </Typography>
            </Grid>
            <MockUp />
        </Grid>
    )
}

export default Help
