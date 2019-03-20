
// Home page.

import React from 'react';
import { Redirect } from 'react-router-dom'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'

import GeneName from 'gene/geneName'

import appLogo from 'app/images/logo.svg'

const HomePres = ({username, redirect, onSearchSelect, onRedirect }) => {

    // If we are to be redirected to the search page, do that.
    if (redirect) {
        onRedirect()
        return (
            <Redirect to='/explore/search' />
        )
    }
    //let loginUrl = 'http://localhost:5555/user/sign-in'
    //loginUrl += '?next=/cell-help'
    return (
        <div id='homePage'>
            <Grid container spacing={16} alignItems='center' >
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={5} style={{paddingBottom: '4rem'}}>
                    <Typography variant='caption' align='right'
                        style={{paddingTop: '1.5rem'}}>
                        UC Santa Cruz Genomics Institute, Stuart Lab
                    </Typography>
                    <Typography variant='h4' align='right'>
                        Cell Atlas
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <img
                        src={appLogo}
                        width='100px'
                        alt='logo'
                    />
                </Grid>
                <GeneName/>
            </Grid>
        </div>
    )
}
/*

                <Grid item xs={5}>
                    <Button href={loginUrl}>Login</Button>
                </Grid>
                <Grid item xs={5}>
                    <Typography>
                        {'username: ' + username}
                    </Typography>
                </Grid>
*/

export default HomePres
