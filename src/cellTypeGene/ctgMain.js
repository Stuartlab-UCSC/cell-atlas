
// The main component for the cell type worksheet gene table.

import { connect } from 'react-redux'
import React from 'react'
import { CircularProgress, Typography } from '@material-ui/core'
import ClusterNames from 'cellTypeWork/clusterNames'
import ctwDataStore from 'cellTypeWork/dataStore'
import dataStore from 'cellTypeGene/ctgDataStore'
import CtgTable from 'cellTypeGene/ctgTable'
import getGeneTableData from 'cellTypeGene/ctgFetch'

const DOMAIN = 'cellTypeGene'

const Presentation = (props) => {
    // Rendering of the gene table.
    const { cluster, count, data, dims, fetchMessage, fetchStatus, withFilter,
        onClick } = props
    const { colWidth } = props.dims
    let Counts = null
    let ClusterBar = null
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
    } else if (!fetchMessage) {
        Counts = (
            <Typography inline={true} style={{
                fontSize: '1.1rem',
                verticalAlign: 'bottom',
                marginRight: '1.5rem',
            }}>
                Cluster <b>{cluster}</b>: <b>{count}</b> genes found
                    {withFilter}
            </Typography>
        )
        const {clusters, colormap } = props
        ClusterBar = (
            <ClusterNames
                clusters={clusters}
                colormap={colormap}
                dims={dims}
                geneTable={true}
                menuPosition={null}
                topStyle={{
                    display: 'inline-block',
                    width: colWidth,
                    verticalAlign: 'bottom',
                    marginBottom: 5,
                }}
                onClick={onClick}
            />
        )
    }
    return (
        <div style={{position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: 18,
                left: 245,
                zIndex: 1,
            }} >
                {Counts}
                {ClusterBar}
            </div>
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
        count: dataStore.getCount(),
        dims: state.cellTypeWork.dims,
        fetchMessage: state.cellTypeGene.fetchMessage,
        fetchStatus: state.cellTypeGene.fetchStatus,
        withFilter: (state.cellTypeGene.filterText.length)
            ? ' with filter' : '',
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
