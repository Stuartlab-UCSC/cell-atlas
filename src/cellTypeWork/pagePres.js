// Cell type worksheet page presentational component.

import React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import BubbleTooltip from 'bubble/tooltip'
import SheetList from 'cellTypeWork/sheetList'
import Worksheet from 'cellTypeWork/worksheet'
import CtwMenu from 'cellTypeWork/ctwMenu'
import ScatterPlot from 'cellTypeScatter/scatter'
import GeneTable from 'cellTypeGene/ctgMain'

const Dataset = ({ show, dataset }) => {
    if (!show) {
        return null
    }
    return (
        <Typography>
            Dataset: {<b>{dataset}</b>}
        </Typography>
    )
}

const ClusterSolution = ({ show, solution }) => {
    if (!show) {
        return null
    }
    return (
        <Typography>
            Clustering: {<b>{solution}</b>}
        </Typography>
    )
}

const Left = ({ props }) => {
    const { clusterSolution, dataset, showEditables } = props
    return (
        <Grid container spacing={8}>
            <Grid item xs={12} style={{width: '70%'}} >
                <SheetList />
                <Dataset dataset={dataset} show={showEditables} />
                <ClusterSolution solution={clusterSolution} show={showEditables} />
            </Grid>
        </Grid>
    )
}

const Top = ({props}) => {
    return (
        <CtwMenu />
    )
}

const Presentation = (props) => {
    const { bubbleTooltip, showEditables } = props
    return (
        <div style={{position: 'relative'}}>
            <Grid container spacing={16} style={{background: 'transparent'}}>

                <Grid item xs={1}>
                    <Top props={props} />
                </Grid>
                <Grid item xs={4}>
                    <Left props={props} />
                </Grid>
                <Grid item xs={7} />

                <Grid item xs={5}>
                    <ScatterPlot show={showEditables} />
                </Grid>
                <Grid item xs={7}>
                    <Worksheet />
                </Grid>

                <Grid item xs={12}>
                    <GeneTable/>
                </Grid>
            </Grid>
            <BubbleTooltip data={bubbleTooltip} id='cellTypeWork' />
        </div>
    )
}

export default Presentation
