
import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import SearchIcon from '@material-ui/icons/Search';

import MockUp from 'components/MockUp'
import SmallButton from 'components/SmallButton'
import SearchBar from "search/SearchBar";
import drawDemo from 'draw/images/demo.png'

const searchIconStyle = { marginTop: 10, float: 'right' }

const Expression = () => {
    const expressionStr = ' Expression pattern'
    const comp = (
        <React.Fragment>
            <Grid item xs={1}>
                <SearchIcon style={{float: 'right'}} />
            </Grid>
            <Grid item xs={11}>
                <Typography>
                    {expressionStr}
                </Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={2} >
                <SmallButton
                    label='Upload a file'
                    action='upload'
                />
            </Grid>
            <Grid item xs={2}>
                <Typography>
                    or draw a pattern
                </Typography>
            </Grid>
            <Grid item xs={7}>
                <img
                    src={drawDemo}
                    alt='drawDemo'
                    height={300}
                />
            </Grid>
        </React.Fragment>
    )
    return comp
}

const SearchPres = ({ results }) => {
    return (
        <React.Fragment>
        <Grid container spacing={16}
              className='pageBody'
        >
            <MockUp />
            <Grid item xs={12}>
                <Typography variant='title'>
                    Search Trajectories
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <SearchIcon
                    style={searchIconStyle}
                />
            </Grid>
            <Grid item xs={11}>
                <SearchBar />
            </Grid>
            <Expression />
        </Grid>
        </React.Fragment>
    )
}

export default SearchPres
