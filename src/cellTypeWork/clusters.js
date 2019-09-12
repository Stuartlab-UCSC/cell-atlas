// The logic for the clusters and their info on the cell type worksheet.

import { connect } from 'react-redux'
import Presentation from 'cellTypeWork/clustersPres'
import { sortableOnMouseDown, sortableOnMouseOver } from 'app/sortable'
import getGeneTableData from 'cellTypeGene/ctgFetch'
import { reorder as cellTypeReorder } from 'cellTypeBar/cellTypes'
import dataStore from 'cellTypeWork/dataStore'
import { clearContextElements } from 'cellTypeWork/worksheet'
import { scatterColumnsReordered } from 'cellTypeScatter/scatter'

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
    // Remove and insert the item in its new place in the list.
    const sortee = dataStore.getClusters()
    const item = sortee[start]
    sortee.splice(start, 1)
    sortee.splice(end, 0, item)
    dataStore.reorderClusters(sortee)
    // Also reorder the cell types the same.
    cellTypeReorder(start, end)
    // Update the scatter plot to the new colors.
    scatterColumnsReordered()
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
            // Clear any context elements not belonging to this domain.
            clearContextElements(DOMAIN)
            sortableOnMouseOver(ev, dispatch, 'cellTypeWork.clusterMenu.open')
            /*
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
            */
        },
        onMouseDown: ev => {
            // Close the usual hover items.
            dispatch({ type: 'cellTypeWork.clusterMenu.hide' })
            clearContextElements()
            const marker = {
            // Save the info for this item for sortable drag and drop.            const marker = {
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
