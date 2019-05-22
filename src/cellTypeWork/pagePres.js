// Cell type worksheet page presentational component.

import React from 'react';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import SheetList from 'cellTypeWork/sheetList'
import Worksheet from 'cellTypeWork/worksheet'
import GeneTable from 'cellTypeWork/geneTable'
import MockUp from 'components/MockUp'

import scatterPlot from 'cellTypeWork/scatterPlot.png'

const buttonStyle = {
    width: '100%',
    marginRight: '1rem',
    marginTop: '1rem',
}

const Upload = ({ onClick} ) => {
    return (
        <Button
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

const Save = ({ show, onClick }) => {
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
            Save
        </Button>
    )
}

const Dataset = ({ show, dataset }) => {
    if (!show) {
        return null
    }
    return (
        <Typography>
            Dataset: {<b><i>{dataset}</i></b>}
        </Typography>
    )
}

const ClusterSolution = ({ show, solution }) => {
    if (!show) {
        return null
    }
    return (
        <Typography>
            Cluster Solution: {<b><i>{solution}</i></b>}
        </Typography>
    )
}

const ScatterPlot = ({ show }) => {
    if (!show) {
        return null
    }
    return (
        <img
            src={scatterPlot}
            alt='scatterPlot'
            height={400}
            style={{zIndex:-1}}
        />
    )
}

const Presentation = (props) => {
    const { clusterSolution, dataset, showSave, onSaveClick, onUploadClick }
        = props
    return (
        <div>
        <Grid container spacing={16} style={{background: 'transparent'}}>
            <Grid item xs={3}>
                <Typography variant='h6'>
                    Cell Type Worksheet
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <SheetList />
            </Grid>
            <Grid item xs={2}>
                <Upload onClick={onUploadClick} />
            </Grid>
            <Grid item xs={2}>
                <Save
                    show={showSave}
                    onClick={onSaveClick}
                />
            </Grid>
            
            <Grid item xs={4}>
                <Dataset dataset={dataset} show={showSave} />
                <ClusterSolution solution={clusterSolution} show={showSave} />
            </Grid>
           <Grid item xs={8} />
 
            <Grid item xs={4}>
                <ScatterPlot show={showSave} />
            </Grid>
            <MockUp zIndex={-1} style={{marginTop: -80, position: 'absolute'}} />
            <Grid item xs={8} style={{marginTop: -70}}>
                <Worksheet />
            </Grid>

            <Grid item xs={12} style={{marginBottom: '2.5rem'}}>
                <GeneTable/>
            </Grid>
        </Grid>
        </div>
    )
}

export default Presentation