// The logic for the clusters and their info on the cell type worksheet.

import { connect } from 'react-redux'
import Presentation from 'cellTypeWork/clustersPres'
import { sortableOnMouseDown, sortableOnMouseOver } from 'app/sortable'
import { set as rxSet } from 'state/rx'
import { buildTypeGroups } from 'cellTypeWork/transformToChart'
import getGeneTableData from 'cellTypeGene/ctgFetch'
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

const reorderColumns = (order) => {
    // Reorder columns given an array of new positions indexed
    // by the old positions.

    // Reorder the clusters.
    const oldClusters = dataStore.getClusters()
    const newClusters = oldClusters.map((cluster, oldC) => {
        return oldClusters[order[oldC]]
    })
    dataStore.setClusters(newClusters)

    // Update the scatter plot to the new colors.
    scatterColumnsReordered()

    // Reorder the cell Types.
    const oldCellTypes = dataStore.getCellTypes()
    const newCellTypes = oldCellTypes.map((type, oldC) => {
        return oldCellTypes[order[oldC]]
    })
    dataStore.setCellTypes(newCellTypes)

    // Rebuild the cell type groups.
    dataStore.setTypeGroups(buildTypeGroups(newCellTypes))
    
    // Re-render.
    rxSet('cellTypeWork.render.now')
}

const reorder = (newC, oldC) => {
    // Find the new order given a new and old column position.
    
    // Build an array of old column positions indexed by the new positions.
    const clusters = dataStore.getClusters()
    let order = [...Array(clusters.length).keys()]
    
    // Fix up the values in the array for the new column position.
    order.splice(newC, 1)
    order.splice(oldC, 0, newC)
    
    reorderColumns(order)
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
export { reorderColumns }
