
// 'About Us' text.

import React from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Detail = () => {
    return (
        <Typography>
            The UCSC Cell Atlas is a growing compendium of single cell mRNA seq
            data coupled with visualizations and query abilities designed to
            expedite the process of biological discovery from single cell mRNA
            seq experiments. We aim to augment research by providing an
            intuitive web interface for browsing single cell mRNA seq
            experiments and a seamless connection from browsing to analysis
            through a RESTful API. The latest addition to the Cell Atlas is the
            cell type workbench to ease the burden of manual annotation and
            creation of publication quality figures for newly generated data.
        </Typography>
    )
}

const Presentation = ({ open, onChange }) => {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expanded={open}
                expandIcon={<ExpandMoreIcon/>}
                onChange={onChange}
            >
                <Typography variant='body1'>
                    About
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Detail />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

const mapStateToProps = (state) => {
    return {
        expand: {
            'open': state.app.homeAboutOpen,
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (ev) => {
            dispatch({ type: 'app.homeAboutOpen.toggle' })
        },
    }
}

const About = connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)


export default About

