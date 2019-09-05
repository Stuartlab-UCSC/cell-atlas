// The top drawer of the Cell type worksheet page.

import React from 'react';
import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core';

import dataStore from 'cellTypeWork/dataStore'
import 'cellTypeWork/style.css'

const DatasetClustering = ({ dataset, clustering }) => {
    let clusteringLabel = null
    let clusteringValue = null
    if (clustering.length) {
        clusteringLabel = 'Clustering:'
        clusteringValue = clustering
    }
    let datasetLabel = null
    let datasetValue = null
    if (dataset.length) {
        datasetLabel = 'Dataset:'
        datasetValue = dataset
    }
    return (
        <Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;{clusteringLabel} {<b>{clusteringValue}</b>}
            &nbsp;&nbsp;&nbsp;&nbsp;{datasetLabel} {<b>{datasetValue}</b>}
        </Typography>
    )
}

const WorksheetMetaPres = (props) => {
    const { clustering, dataset, description } = props
    return (
        <Grid container spacing={16} >
            <Grid item xs={12} style={{marginTop: '1rem'}}>
                <DatasetClustering
                    clustering={clustering}
                />
            </Grid>
        
            <Grid item xs={12}>
                <DatasetClustering
                    dataset={dataset}
                />
            </Grid>
    
            <Grid item xs={12}>
                <Typography>
                    {description}
                </Typography>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    console.log('worksheetMeta: dataStore:', dataStore.get())
    return {
        background: 'white',
        clustering: dataStore.getClusterSolution() || '',
        dataset: dataStore.getDataset() || '',
        description: dataStore.getDescription() || '',
        worksheet: state.cellTypeWork.sheetSelected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const WorksheetMeta = connect(
    mapStateToProps, mapDispatchToProps
)(WorksheetMetaPres)

export default WorksheetMeta
