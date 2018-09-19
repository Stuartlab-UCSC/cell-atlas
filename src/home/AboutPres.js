
// 'About Us' text.

import React from 'react'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const People = () => {
    const comp =
        <span style={{display: 'block'}}>
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

const AboutUsDetail = (expand) => {
    const stuartLab = ' Stuart Laboratory'
    const gi = ' UC Santa Cruz Genomics Institute'
    const comp =
        <Collapse in={expand} timeout="auto" unmountOnExit>
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
        </Collapse>
    return comp
}

const MethodDetail = (expand) => {
    const comp =
        <Collapse in={expand} timeout="auto" unmountOnExit>
            <Typography>
                <a
                    href = 'http://cancerres.aacrjournals.org/content/77/21/e111?utm_source=170580&utm_medium=clinical1&utm_campaign=compresfocus'
                    rel="noopener noreferrer"
                    target='_blank'
                >
                    Newton, et al., Cancer Research 2017
                </a>
            </Typography>
        </Collapse>
    return comp
}

const MissionDetail = (expand) => {
    const comp =
        <Collapse in={expand} timeout="auto" unmountOnExit>
            <Typography>
                We provide a visualization of single cell samples that share
                common molecular profiles, allowing multiple platforms and data
                types to be combined to view sample relationships in multiple
                omic spaces. We want this tool to help you by revealing
                patterns, answering questions and generating new hypotheses.
            </Typography>
        </Collapse>
    return comp
}

const WhatIsDetail = (expand) => {
    const comp =
        <Collapse in={expand} timeout="auto" unmountOnExit>
            <Typography>
                Cell Atlas is an interactive browser that allows biologists, who
                may not have computational expertise, to richly explore the
                results of high-throughput genomics experiments on thousands of
                cell samples.
            </Typography>
        </Collapse>
    return comp
}

const Section = ({id, title, detail, expand, onExpandClick}) => {
    const comp =
        <div className='parent' data-which={id}>
            <Typography variant='title' style={{display: 'inline'}}>
                {title}
            </Typography>
            <IconButton
                onClick={onExpandClick}
                aria-expanded={expand}
                aria-label="Show more"
            >
                <ExpandMoreIcon />
            </IconButton>
            {detail(expand)}
        </div>
    return comp
}

const AboutPres = ({expand, onExpandClick }) => {

    return (
        <Grid container style={{ marginTop: '500px' }}>
            <Grid item xs={3}>
                <Section onExpandClick={onExpandClick}
                    id='whatIs'
                    title='What is ...?'
                    detail={WhatIsDetail}
                    expand={expand.whatIs}
                />
            </Grid>
            <Grid item xs={3}>
                <Section onExpandClick={onExpandClick}
                    id='mission'
                    title='Our Mission'
                    detail={MissionDetail}
                    expand={expand.mission}
                />
            </Grid>
            <Grid item xs>
                <Section onExpandClick={onExpandClick}
                    id='about'
                    title='About Us'
                    detail={AboutUsDetail}
                    expand={expand.about}
                />
            </Grid>
            <Grid item xs>
                <Section onExpandClick={onExpandClick}
                    id='method'
                    title='Method'
                    detail={MethodDetail}
                    expand={expand.method}
                />
            </Grid>
        </Grid>
    )
}

export default AboutPres;


