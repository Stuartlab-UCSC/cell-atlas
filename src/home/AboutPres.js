
// 'About Us' text.

import PropTypes from 'prop-types'
import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Expander from 'components/Expander'
/*
const People = () => {
    const comp =
        <span style={{display: 'block', marginTop: '0.5rem'}}>
            ...<br />
            <a href='https://sysbiowiki.soe.ucsc.edu/node/143'
               rel="noopener noreferrer" target='_blank'>Duncan McColl
            </a><br />
            Ria Panjwani<br />
            <a href='https://www.soe.ucsc.edu/people/swat'
               rel="noopener noreferrer" target='_blank'>Teresa Swatloski
            </a><br />
            <a href='https://www.soe.ucsc.edu/people/haussler'
                rel="noopener noreferrer" target='_blank'>David Haussler
            </a><br />
            <a href='https://www.soe.ucsc.edu/people/jstuart'
                rel="noopener noreferrer" target='_blank'>Joshua Stuart
            </a><br />
        </span>
    
    return comp
}
*/
const AboutUsDetail = () => {
    const stuartLab = ' Stuart Laboratory'
    const gi = ' UC Santa Cruz Genomics Institute'
    const comp =
        <Typography>
            We research genomics in the
            <br/>
            <a
                href="https://sysbiowiki.soe.ucsc.edu/Welcome"
                rel="noopener noreferrer"
                target='_blank'
            >
                {stuartLab}
            </a>
            <br/>
            part of the
            <br/>
            <a
                href="http://genomics.ucsc.edu"
                rel="noopener noreferrer"
                    target='_blank'
            >
                {gi}
            </a>
        </Typography>
    return comp
}
/*
const MethodDetail = () => {
    const comp =
        <Typography>
            TBD
        </Typography>
    return comp
}
*/
const MissionDetail = () => {
    const comp =
        <Typography>
            We provide analysis and visualizations of single cell samples that share
            common molecular profiles and trajectories, allowing multiple cell
            types to be combined to view sample relationships.
            We want this tool to help you by revealing
            patterns, answering questions and generating new hypotheses.
        </Typography>
    return comp
}

const WhatIsDetail = () => {
    const comp =
        <Typography>
            Cell Atlas is an interactive browser that allows biologists, who
            may not have computational expertise, to richly explore the
            results of high-throughput genomics and trajectory analysis
            on millions of cell samples.
        </Typography>
    return comp
}

const AboutPres = ({expand }) => {
    const style = {
        marginTop: 550,
    }
    
    return (
        <Grid container spacing={40} style={style}>
            <Grid item xs>
                <Expander
                    id='about.whatIs.expand'
                    summary='What is ...?'
                    summaryVarient='title'
                    detail={<WhatIsDetail />}
                    expand={expand['about.whatIs.expand']}
                />
            </Grid>
            <Grid item xs>
                <Expander
                    id='about.mission.expand'
                    summary='Our Mission'
                    summaryVarient='title'
                    detail={<MissionDetail />}
                    expand={expand['about.mission.expand']}
                />
            </Grid>
            <Grid item xs>
                <Expander
                    id='about.about.expand'
                    summary='About Us'
                    summaryVarient='title'
                    detail={<AboutUsDetail />}
                    expand={expand['about.about.expand']}
                />
            </Grid>
        </Grid>
    )
}

Expander.propTypes = {
    expand: PropTypes.bool.isRequired, // true means section is to be expanded
}

export default AboutPres;

