// The logic for the clusters and their info on the cell type worksheet.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import Presentation from 'cellTypeWork/clustersPres'
import { sortableOnMouseDown, sortableOnMouseOver } from 'app/sortable'
import { getGeneTableData } from 'cellTypeGene/table'
import { reorder as cellTypeReorder } from 'cellTypeWork/cellTypes'
import dataStore from 'cellTypeWork/dataStore'
import { clearContextElements } from 'cellTypeWork/worksheet'

const DOMAIN = 'cellTypeWorkClusters'

const mapStateToProps = (state) => {
    return {
        clusters: dataStore.getClusters(),
        colormap: state.cellTypeWork.colormap,
        menuOpen: state.cellTypeWork.contextMenu.open,
        menuPosition: state.cellTypeWork.contextMenu.position,
        sorting: (state.sortable.drag.count !== null),
        dims: state.cellTypeWork.dims,
        render: state.cellTypeWork.render,
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
            // Save the cluster name then get its gene stats.
            const cluster = dataStore.getClusters()[
                ev.target.dataset.position]
            dispatch({
                type: 'cellTypeGene.cluster.uiSet',
                value: cluster.name
            })
            getGeneTableData()
            // Close the context menu.
            dispatch({
                type: 'cellTypeWork.contextMenu.closeFromGeneStatsClick',
            })
        },
        onMenuClickAway: ev => {
            dispatch({
                type: 'cellTypeWork.contextMenu.closeFromClusterClickAway',
            })
        },
        onMouseOver: ev => {
            // Clear any leftover context elements.
            clearContextElements(dispatch, 'clusters')
            
            // If we're sorting, handle the drag even.
            if (rxGet('sortable.drag').count !== null) {
                sortableOnMouseOver(ev)
            } else {
                // The elements are not being sorted, so show the context menu.
                dispatch({
                    type: 'cellTypeWork.contextMenu.open',
                    position: ev.target.dataset.position
                })
            }
        },
        onMouseleave: ev => {
            // The elements are not being sorted, so close the context menu.
            dispatch({
                type: 'cellTypeWork.contextMenu.closeFromClusterMouseLeave' })
        },
        onMouseDown: ev => {
            // Close the context menu.
            dispatch({
                type: 'cellTypeWork.contextMenu.closeFromClusterMouseDown',
            })
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
        onMouseUp: ev => {
            // On mouse up, show the context menu when we're not dragging,
            dispatch({
                type: 'cellTypeWork.contextMenu.mouseUp',
                open: true,
                position: ev.target.dataset.position,
            })
        },
    }
}

const CellTypes = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypes
