
// The main component for the cell type worksheet gene table.

import { connect } from 'react-redux'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import ClusterNames from 'cellTypeWork/clusterNames'
import ctwDataStore from 'cellTypeWork/dataStore'
import dataStore from 'cellTypeGene/ctgDataStore'
import CtgTable from 'cellTypeGene/ctgTable'
import getGeneTableData from 'cellTypeGene/ctgFetch'

const DOMAIN = 'cellTypeGene'

const Presentation = (props) => {
    // Rendering of the gene table.
    const { cluster, dataLength, dims, fetchMessage, onClick } = props
    const { colWidth } = props.dims
    let Counts = null
    let ClusterBar = null
    if (!fetchMessage) {
        Counts = (
            <Typography inline={true} style={{
                fontSize: '1.1rem',
                verticalAlign: 'bottom',
                marginRight: '1.5rem',
            }}>
                Cluster <b>{cluster}</b>: <b>{dataLength}</b> genes found
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
        dataLength: dataStore.getData().length,
        dims: state.cellTypeWork.dims,
        fetchMessage: state.cellTypeGene.fetchMessage,
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
