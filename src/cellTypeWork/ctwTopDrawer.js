// The top drawer of the Cell type worksheet page.

import React from 'react';
import { connect } from 'react-redux'
import { Drawer, Grid, IconButton, Typography } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import dataStore from 'cellTypeWork/dataStore'
import SheetList from 'cellTypeSheet/sheetList'
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

const Body = ({props}) => {
    const { clustering, dataset, description } = props
    return (
        <Grid container spacing={16} >
            <Grid item xs={4} >
                <div style={{width: '90%', margin: 'auto'}} >
                    <SheetList />
                </div>
            </Grid>
            <Grid item xs={8} style={{marginTop: '1.5rem'}}>
                <DatasetClustering
                    clustering={clustering}
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

const CtwTopDrawerPres = (props) => {
    const { background, open, onBackdropClick, onClose } = props
    if (!open) {
        return null
    }
    return (
        <Drawer
            open={open}
            anchor='top'
            ModalProps={{
                //hideBackdrop: true,
                style: { width: '90%' },
                BackdropProps: { style: { background: 'rgb(127,127,127,0.5)' }},
                onBackdropClick,
            }}
            PaperProps={{ style: { background: background }}}
        >
            <div style={{
                position: 'relative',
                margin: '2rem',
                marginTop: '3.3rem',
                marginBottom: 0,
            }}>
                <Body props={props} />
                <div style={{
                    marginTop: -16,
                    marginLeft: 50,
                }} >
                    <IconButton
                        onClick={onClose}
                    >
                        <KeyboardArrowUpIcon color='primary' />
                    </IconButton>
                </div>
            </div>
        </Drawer>
    )
}

const mapStateToProps = (state) => {
    return {
        background: 'white',
        clustering: dataStore.getClusterSolution() || '',
        dataset: dataStore.getDataset() || '',
        description: dataStore.getDescription() || '',
        open: state.cellTypeWork.topDrawer,
        worksheet: state.cellTypeSheet.selected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBackdropClick: ev => {
            dispatch({ type: 'cellTypeWork.topDrawer.close' })
        },
        onClose: ev => {
            dispatch({ type: 'cellTypeWork.topDrawer.close' })
        },
    }
}

const CtwTopDrawer = connect(
    mapStateToProps, mapDispatchToProps
)(CtwTopDrawerPres)

export default CtwTopDrawer
