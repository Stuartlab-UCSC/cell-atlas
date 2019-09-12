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
        sorting: (state.sortable.drag.active),
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
    // TODO Reorder the cell types the same.
    cellTypeReorder(start, end)
    // TODO update the cell type group order.
    // Update the scatter plot to the new colors.
    scatterColumnsReordered()
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseDown: ev => {
            // Close all context elements.
            clearContextElements()
            // Save the info for this item for sortable drag and drop.
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
        },
    }
}

const CellTypes = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypes
