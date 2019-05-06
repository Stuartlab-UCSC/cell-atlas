
// Admin page.

import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Page = () => {
    return (
        <Grid container spacing={16}>
            <Grid item xs={12} >
                <Typography variant='h6' >
                    Admin
                </Typography>
            </Grid>
            <Grid item xs={12} >
                Add role to user
            </Grid>
        </Grid>
    )
}

export default Page
