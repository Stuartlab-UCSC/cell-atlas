
// 'About Us' text.

import PropTypes from 'prop-types'
import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Expander from 'components/Expander'

const People = () => {
    const comp =
        <span style={{display: 'block', marginTop: '1rem'}}>
            <a href='https://www.soe.ucsc.edu/people/ynewton'
                rel="noopener noreferrer" target='_blank'>Yulia Newton
            </a><br />
            <a href='https://www.soe.ucsc.edu/people/anovak'
                rel="noopener noreferrer" target='_blank'>Adam Novak
            </a><br />
            <a href='https://www.soe.ucsc.edu/people/swat'
                rel="noopener noreferrer" target='_blank'>Teresa Swatloski</a><br />
            <a href='https://sysbiowiki.soe.ucsc.edu/node/143'
                rel="noopener noreferrer" target='_blank'>Duncan McColl
            </a><br />
            <a href='https://www.linkedin.com/in/schopra8'
                rel="noopener noreferrer" target='_blank'>Sahil Chopra
                </a><br />
            <a href='https://www.soe.ucsc.edu/people/graim'
                rel="noopener noreferrer" target='_blank'>Kiley Graim
            </a><br />
            <a href='https://www.soe.ucsc.edu/people/aweinstein'
                rel="noopener noreferrer" target='_blank'>Alana Weinstein
            </a><br />
            <a href='https://www.soe.ucsc.edu/people/baertsch'
                rel="noopener noreferrer" target='_blank'>Robert Baertsch
            </a><br />
            <a href='https://www.soe.ucsc.edu/people/ssalama'
                rel="noopener noreferrer" target='_blank'>Sofie Salama
            </a><br />
            <a href='https://www.ohsu.edu/xd/education/schools/school-of-medicine/academic-programs/graduate-studies/faculty/grad-studies-faculty.cfm?facultyid=892'
                rel="noopener noreferrer" target='_blank'>Kyle Ellrott</a><br />
            Manu Chopra<br />
            Ria Panjwani<br />
            <a href='https://www.soe.ucsc.edu/people/olena'
                rel="noopener noreferrer" target='_blank'>Olena Morozova
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

const AboutUsDetail = () => {
    const stuartLab = ' Stuart Laboratory'
    const gi = ' UC Santa Cruz Genomics Institute'
    const comp =
        <Typography>
            We research genomics in the
                <a
                    href="https://sysbiowiki.soe.ucsc.edu/Welcome"
                    rel="noopener noreferrer"
                    target='_blank'
                >
                    {stuartLab}
                </a>,
                part of the
                <a
                    href="http://genomics.ucsc.edu"
                    rel="noopener noreferrer"
                        target='_blank'
                >
                    {gi}
                </a>.
                <People />
        </Typography>
    return comp
}

const MethodDetail = () => {
    const comp =
        <Typography>
            <a
                href = 'http://cancerres.aacrjournals.org/content/77/21/e111?utm_source=170580&utm_medium=clinical1&utm_campaign=compresfocus'
                rel="noopener noreferrer"
                target='_blank'
            >
                Newton, et al., Cancer Research 2017
            </a>
        </Typography>
    return comp
}

const MissionDetail = () => {
    const comp =
        <Typography>
            We provide a visualization of single cell samples that share
            common molecular profiles, allowing multiple platforms and data
            types to be combined to view sample relationships in multiple
            omic spaces. We want this tool to help you by revealing
            patterns, answering questions and generating new hypotheses.
        </Typography>
    return comp
}

const WhatIsDetail = () => {
    const comp =
        <Typography>
            Cell Atlas is an interactive browser that allows biologists, who
            may not have computational expertise, to richly explore the
            results of high-throughput genomics experiments on thousands of
            cell samples.
        </Typography>
    return comp
}

const AboutPres = ({expand }) => {
    const style = {
        marginTop: '500px',
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
            <Grid item xs>
                <Expander
                    id='about.method.expand'
                    summary='Method'
                    summaryVarient='title'
                    detail={<MethodDetail />}
                    expand={expand['about.method.expand']}
                />
            </Grid>
        </Grid>
    )
}
/*
*/

Expander.propTypes = {
    expand: PropTypes.bool.isRequired, // true means section is to be expanded
}

export default AboutPres;

