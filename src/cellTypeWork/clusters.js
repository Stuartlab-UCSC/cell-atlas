// The logic for the clusters and their info on the cell type worksheet.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import Presentation from 'cellTypeWork/clustersPres'
import { sortableOnMouseDown, sortableOnMouseOver } from 'app/sortable'
import getGeneTableData from 'cellTypeGene/ctgFetch'
import { reorder as cellTypeReorder } from 'cellTypeWork/cellTypes'
import dataStore from 'cellTypeWork/dataStore'
import { clearContextElements } from 'cellTypeWork/worksheet'

const DOMAIN = 'cellTypeWorkClusters'

const mapStateToProps = (state) => {
    return {
        clusters: dataStore.getClusters(),
        colormap: state.cellTypeWork.colormap,
        menuPosition: state.cellTypeWork.clusterMenu,
        sorting: (state.sortable.drag.count !== null),
        dims: state.cellTypeWork.dims,
        render: state.cellTypeWork.render,
        onMenuClickAway: clearContextElements,
    }
}

const reorder = (start, end) => {
    // Remove the cluster data from it's current position.
    const clusters = dataStore.getClusters()
    const cluster = clusters[start]
    clusters.splice(start, 1)
    // Insert the cluster data into its new position.
    clusters.splice(end, 0, cluster)
    dataStore.reorderClusters(clusters)
    // Also reorder the cell types the same.
    cellTypeReorder(start, end)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGeneStatsClick: ev => {
            // Get the cluster's gene stats.
            const cluster = dataStore.getClusters()[ev.target.dataset.position]
            getGeneTableData(cluster.name)
            // Close the context menu.
            clearContextElements()
        },
        onMouseLeave: ev => {
            clearContextElements(DOMAIN)
        },
        onMouseOver: ev => {
            // Clear any context elements not belonging to cluster names.
            clearContextElements(DOMAIN)
            
            // If we're sorting, handle the drag event.
            if (rxGet('sortable.drag').count !== null) {
                sortableOnMouseOver(ev)
            } else {
                // The elements are not being sorted, so show the context menu.
                dispatch({
                    type: 'cellTypeWork.clusterMenu.open',
                    position: ev.target.dataset.position
                })
            }
        },
        onMouseDown: ev => {
            // Close the context menu.
            dispatch({ type: 'cellTypeWork.clusterMenu.hide' })
            clearContextElements()
            // Save the info for this cluster for sortable drag and drop.
            const marker = {
                width: '2px',
                height: '20px',
                topOffset: 0,
                leftOffset: -1,
            }
            sortableOnMouseDown(
                ev,
                dataStore.getClusters().length,
                DOMAIN,
                marker,
                reorder,
                'x',
                dispatch,
            )
        },
    }
}

const CellTypes = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypes
