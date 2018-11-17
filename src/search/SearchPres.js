
import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import SearchIcon from '@material-ui/icons/Search';

import MockUp from 'components/MockUp'
import SmallButton from 'components/SmallButton'
import SearchBar from "search/SearchBar";
import SearchBarExpression from "search/SearchBarExpression";
import { background } from 'app/theme'
import drawDemo from 'draw/images/demo.png'
import body1 from 'images/body1.png'
import body2 from 'images/body2.png'
import body3 from 'images/body3.png'

const Expression = () => {
    const iconStyle = {
        paddingRight: '0.5rem',
        paddingLeft: '0.5rem',
    }
    const comp = (
        <Paper>
            <Grid container spacing={16}>
                <MockUp />
                <Grid item xs={1}>
                    <SearchIcon style={iconStyle} />
                </Grid>
                <Grid item xs={11}>
                    <Typography>
                        Expression Pattern
                    </Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={11} >
                    <SmallButton
                        label='Upload a file'
                        action='upload'
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={4}>
                    <Typography style={{marginTop: '0.5rem'}}>
                        or draw a pattern of:
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <SearchBarExpression style={{marginRight: '-0.5rem'}}/>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={11}>
                    <img
                        src={drawDemo}
                        alt='drawDemo'
                        style={{width: '100%'}}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
    return comp
}

const Simple = () => {
    const paperStyle = {
        paddingTop: '0.5rem',
        paddingBottom: '1rem',
        marginBottom: '1rem'
    }
    const iconStyle = {
        paddingTop: '0.5rem',
        paddingRight: '0.5rem',
        paddingLeft: '0.5rem',
    }
    const comp =
        <Paper style={paperStyle}>
            <Grid container spacing={16}>
                <Grid item xs={1}>
                    <SearchIcon style={iconStyle} />
                </Grid>
                <Grid item xs={11}>
                    <SearchBar style={{marginRight: '-0.5rem'}}/>
                </Grid>
            </Grid>
        </Paper>
    return comp
}

const Body = () => {
    const paperStyle = {
        width: '100%',
        paddingTop: '0.5rem',
        paddingBottom: '1rem',
        marginBottom: '1rem'
    }
    const iconStyle = {
        paddingRight: '0.5rem',
        paddingLeft: '0.5rem',
    }
    const creditStyle =  {
        position: 'absolute',
        top: 540,
        fontSize: '0.8rem',
        backgroundColor: background,
        marginLeft: '1rem',
    }
    const comp =
        <Paper style={paperStyle}>
            <Grid container spacing={16} style={{width: '100%'}}>
                <Grid item xs={1}>
                    <SearchIcon style={iconStyle} />
                </Grid>
                <Grid item xs={11}>
                    <Typography>
                        Genotype Tissue Expression (GTEx) Project Body Map
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <img src={body1} alt={'body1'} height={110}
                        style={{marginLeft: 10}}/>
                    <img src={body2} alt={'body2'} height={445}
                         style={{marginLeft: 4}}/>
                    <img src={body3} alt={'body3'} height={109}
                         style={{marginTop: -15}}/>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={11}>
                    <Typography variant={'caption'} style={creditStyle}>
                        Artwork by Jeffery West Designs for the UCSC Genome Browser.
                        <br/>
                        Copyright 2016 Regents of the University of California, no rights reserved (CC0)
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    return comp
}
//            <MockUp />
const SearchPres = ({ results }) => {
    return (
        <Grid container spacing={16} className='pageBody'>
            <Grid item xs={12}>
                <Typography variant='title'>
                    Search Trajectory Branches
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Simple />
                <Expression />
            </Grid>
            <Grid item xs={6}>
                <Body />
            </Grid>
        </Grid>
    )
}

export default SearchPres
