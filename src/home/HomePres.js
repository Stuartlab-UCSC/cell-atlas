
// Home page.

import React from 'react';
import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography'

import GeneName from 'components/geneName'

import appLogo from 'app/images/logo.svg'

const HomePres = ({redirect, onFindGeneClick, onRedirect }) => {

    // If we are to be redirected to the gene chart page, do that.
    if (redirect) {
        onRedirect()
        return (
            <Redirect to='/gene' />
        )
    }
    //let loginUrl = 'http://localhost:5555/user/sign-in'
    //loginUrl += '?next=/cell-help'
    return (
        <div id='homePage'>
            <iframe
                id='homeDummyframe'
                width='0'
                height='0'
                border='0'
                name='homeDummyframe'
                title='homeDummyframe' >
            </iframe>
            <form
                target='homeDummyframe'
                onSubmit={onFindGeneClick}
            >
                <Grid container spacing={16} alignItems='center' >
                    <Grid item xs={1} />
                    <Grid item xs={5} style={{paddingBottom: '4rem'}}>
                        <Typography variant='caption' align='right'
                            style={{paddingTop: '1.5rem'}}>
                            University of California Santa Cruz Genomics Institute
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
            
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <GeneName/>
                    </Grid>
                    <Grid item xs={4} />

                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <Button
                            type='submit'
                            variant='contained'
                            component='span'
                            size='small'
                            color='primary'
                            style={{width: '5rem'}}
                            onClick={onFindGeneClick}
                        >
                            Find
                        </Button>

                    </Grid>
                    <Grid item xs={4} />

                </Grid>
            </form>
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
