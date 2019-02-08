
// Home page.

import React from 'react';
import { Redirect } from 'react-router-dom'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'

import { About } from 'home/About'

const bigTitleLeft = 0 // 285
const bigTitleStyle = {
    marginLeft: bigTitleLeft,
}
const smallTitleStyle = {
   marginLeft: bigTitleLeft + 5,
}
const topTitleStyle = {
    ...smallTitleStyle,
}
const pageBodyStyle = {
    paddingLeft: '4rem',
    paddingRight: '4rem',
    paddingBottom: '4rem',
}

const HomePres = ({redirect, onSearchSelect, onRedirect }) => {

    // If we are to be redirected to the search page, do that.
    if (redirect) {
        onRedirect()
        return (
            <Redirect to='/explore/search' />
        )
    }
    return (
        <div id='homePage' className='pageBody' style={pageBodyStyle}>
            <Grid container spacing={16}>
                <Grid item xs={5}>
                    <Typography variant='caption' style={topTitleStyle}>
                        the UC Santa Cruz, Genomics Institute, Stuart Lab
                    </Typography>
                    <Typography variant='display1' style={bigTitleStyle}>
                        CELL ATLAS
                    </Typography>
                </Grid>
            </Grid>
            <About />
        </div>
    )
}
export default HomePres
