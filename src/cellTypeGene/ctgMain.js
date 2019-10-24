
// The main component for the cell type worksheet gene table.

import { connect } from 'react-redux'
import React from 'react'
import { CircularProgress, Grid, Typography } from '@material-ui/core'
import ClusterBar from 'cellTypeCluster/clusterBarPres'
import ctwDataStore from 'cellTypeWork/dataStore'
import dataStore from 'cellTypeGene/ctgDataStore'
import Wish from 'components/wish'
import CtgTable from 'cellTypeGene/ctgTable'
import getGeneTableData from 'cellTypeGene/ctgFetch'

const DOMAIN = 'cellTypeGene'

const Presentation = (props) => {
    // Rendering of the gene table.
    const { cluster, clusters, colormap, count, data, dims, fetchMessage,
        fetchStatus, show, onClick } = props

    let Counts = null
    let bar = null
    if (data === undefined) {
        return (null)
    }
    if (fetchStatus !== 'quiet' || data === undefined) {
        Counts = (
            <CircularProgress
                size={40}
                style={{position: 'fixed', left: 550, top: 300}}
            />
        )
    } else if (!fetchMessage && show) {
        Counts = (
            <Typography inline={true} style={{
                fontSize: '1.1rem',
                verticalAlign: 'bottom',
                marginTop: '0.5rem',
                marginRight: '1.5rem',
            }}>
                Cluster <b>{cluster}</b>: <b>{count}</b> genes found
            </Typography>
        )
        bar = (
            <Grid container spacing={16}>
                <Grid item xs={10}>
                    {Counts}
                    <ClusterBar
                        clusters={clusters}
                        colormap={colormap}
                        dims={dims}
                        menuPosition={null}
                        onClick={onClick}
                    />
                </Grid>
                <Grid item xs={2}
                    style={{paddingBottom: '1rem'}}>
                    <Wish />
                </Grid>
            </Grid>
        )
    }
    return (
        <div>
            {bar}
            <CtgTable />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cluster: state.cellTypeGene.cluster,
        clusters: ctwDataStore.getClusters(),
        colormap: state.cellTypeWork.colormap,
        data: dataStore.getDisplay(),
        count: dataStore.getAvailableCount(),
        dims: state.cellTypeWork.dims,
        fetchMessage: state.cellTypeGene.fetchMessage,
        fetchStatus: state.cellTypeGene.fetchStatus,
        show: state.cellTypeGene.show,
        menuPosition: null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: ev => {
            // Get the cluster's gene stats.
            getGeneTableData(ev.target.dataset.cluster)
        },
    }
}

const GeneTable = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GeneTable
export { DOMAIN }
