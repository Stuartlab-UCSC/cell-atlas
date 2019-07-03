// Cell type worksheet page presentational component.

import React from 'react';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import BubbleTooltip from 'bubble/tooltip'
import SheetList from 'cellTypeWork/sheetList'
import Worksheet from 'cellTypeWork/worksheet'
import ScatterPlot from 'cellTypeScatter/scatter'
import GeneTable from 'cellTypeGene/ctgMain'
import MockUp from 'components/MockUp'

const buttonStyle = {
    width: '90%',
    marginLeft: '1rem',
    marginTop: '1rem',
}

const Upload = ({ onClick} ) => {
    return (
        <Button
            disabled
            variant='contained'
            component='span'
            size='small'
            color='primary'
            onClick={onClick}
            style={buttonStyle}
        >
            Upload Data
        </Button>
    )
}

const Save = ({ label, show, onClick }) => {
    if (!show) {
        return null
    }
    return (
        <Button
            variant='contained'
            component='span'
            size='small'
            onClick={onClick}
            style={buttonStyle}
        >
            {label}
        </Button>
    )
}

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
            Cluster Solution: {<b>{solution}</b>}
        </Typography>
    )
}

const Buttons = ({ show, onSaveAsClick, onSaveClick, onUploadClick }) => {
    return (
        <div style={{
            width: '8rem',
            position: 'absolute',
            top: 0,
            right: -20,
        }}>
            <Upload onClick={onUploadClick} />
            <Save
                label='Save'
                show={show}
                onClick={onSaveClick}
            />
            <Save
                label='Save as'
                show={show}
                onClick={onSaveAsClick}
            />
        </div>
    )
}

const Left = ({ props }) => {
    const { clusterSolution, dataset, showEditables } = props
    return (
        <Grid container spacing={8}>
            <Grid item xs={6}>
                <Typography variant='h6'>
                    Cell Type Worksheet
                </Typography>
            </Grid>
            <Grid item xs={6} style={{width: '70%'}} >
                <SheetList />
            </Grid>
            
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6} style={{zIndex: 1}}>
                <Dataset dataset={dataset} show={showEditables} />
                <ClusterSolution solution={clusterSolution} show={showEditables} />
            </Grid>

            <Grid item xs={12}>
                <ScatterPlot show={showEditables} />
            </Grid>
        </Grid>
    )
}

const Presentation = (props) => {
    const { bubbleTooltip, showEditables, onSaveAsClick, onSaveClick,
        onUploadClick } = props
    return (
        <div style={{position: 'relative'}}>
            <Buttons
                show={showEditables}
                onSaveAsClick={onSaveAsClick}
                onSaveClick={onSaveClick}
                onUploadClick={onUploadClick}
            />
            <MockUp zIndex={-1} style={{marginTop: -80, position: 'absolute'}} />
            <Grid container spacing={16} style={{background: 'transparent'}}>
            
                <Grid item xs={5}>
                    <Left props={props} />
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
