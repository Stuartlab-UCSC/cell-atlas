
// Home page.

import React from 'react';
import { Redirect } from 'react-router-dom'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'
import appLogo from 'app/images/logo.svg'

const pageBodyStyle = {
    paddingLeft: '1rem',
    paddingRight: '0rem',
    paddingBottom: '1rem',
}

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
        <div id='homePage' className='pageBody' style={pageBodyStyle}>
            <Grid container
                spacing={16}
            >
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant='caption' align='right' style={{paddingTop: '1.5rem'}}>
                        the UC Santa Cruz, Genomics Institute, Stuart Lab
                    </Typography>
                    <Typography variant='display1' align='right'>
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
