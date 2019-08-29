// Cell type worksheet page presentational component.

import React from 'react';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

import BubbleTooltip from 'bubble/tooltip'
import SheetList from 'cellTypeWork/sheetList'
import Worksheet from 'cellTypeWork/worksheet'
import CtwMenu from 'cellTypeWork/ctwMenu'
import ScatterPlot from 'cellTypeScatter/scatter'
import GeneTable from 'cellTypeGene/ctgMain'

const Dataset = ({ dataset }) => {
    return (
        <Typography>
            Dataset: {<b>{dataset}</b>}
        </Typography>
    )
}

const ClusterSolution = ({ solution }) => {
    return (
        <Typography>
            Clustering: {<b>{solution}</b>}
        </Typography>
    )
}

const Left = ({ props }) => {
    const { clusterSolution, dataset } = props
    return (
        <Grid container spacing={8}>
            <Grid item xs={12} style={{width: '70%'}} >
                <SheetList />
                <Dataset dataset={dataset} />
                <ClusterSolution solution={clusterSolution} />
            </Grid>
        </Grid>
    )
}

const Presentation = (props) => {
    const { bubbleTooltip, onMenuClick } = props
    const style = {
        position: 'relative',
    }
    const iconStyle = {
        position: 'absolute',
        left: -50,
        top: -24,
    }
    const gridStyle = {
        display: 'inline-block',
        marginTop: -10,
        marginLeft: 0,
        width: '100%'
    }
    return (
        <div style={style}>
            <CtwMenu />
            <IconButton
                style={iconStyle}
                onClick={onMenuClick}
            >
                <MenuIcon />
            </IconButton>

            <div style={gridStyle}>
                <Grid container spacing={8} style={{background: 'transparent'}}>
                    <Grid item xs={12}>
                        <Left props={props} />
                    </Grid>

                    <Grid item xs={5}>
                        <ScatterPlot />
                    </Grid>
                    <Grid item xs={7}>
                        <Worksheet />
                    </Grid>

                    <Grid item xs={12}>
                        <GeneTable/>
                    </Grid>
                </Grid>
            </div>
            <BubbleTooltip data={bubbleTooltip} id='cellTypeWork' />
        </div>
    )
}

export default Presentation
