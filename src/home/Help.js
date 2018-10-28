
import React from 'react'
import Grid from '@material-ui/core/Grid';
import MockUp from 'components/MockUp'
import Typography from "@material-ui/core/Typography/Typography";

const Help = () => {
    return (
        <Grid container spacing={16}
              className='pageBody'
        >
            <MockUp />
            <Grid item xs={12}>
                <Typography variant='title'>
                    Help
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Help
