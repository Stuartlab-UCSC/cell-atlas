// The logic for the cluster bar for the cell type workbench.

import { connect } from 'react-redux'
import Presentation from 'cellTypeCluster/clusterBarPres'
import { sortableOnMouseMove, sortableOnMouseOver } from 'app/sortable'
import { rxGet } from 'state/rx'
import getGeneTableData from 'cellTypeGene/ctgFetch'
import dataStore from 'cellTypeWork/dataStore'
import { clearContextElements } from 'cellTypeWork/worksheet'
import { onInsertGroup } from 'cellTypeBar/colorBarMenu'
import { reorderColumns } from 'cellTypeCluster/cluster'

const DOMAIN = 'cellTypeCluster'

const mapStateToProps = (state) => {
    return {
        typeGroups: dataStore.getTypeGroups(),
        clusters: dataStore.getClusters(),
        colormap: state.cellTypeWork.colormap,
        menuPosition: state.cellTypeCluster.menu,
        sorting: (state.sortable.drag.active),
        dims: state.cellTypeWork.dims,
        render: state.cellTypeWork.render,
        onMenuClickAway: clearContextElements,
    }
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
        onGeneStatsClick: ev => {
            // Get the cluster's gene stats.
            const cluster = dataStore.getClusters()[ev.target.dataset.position]
            getGeneTableData(cluster.name)
            // Close the context menu.
            dispatch({ type: 'cellTypeCluster.menu.optionClicked' })
        },
        onNewTypeClick: ev => {
            onInsertGroup(ev, dispatch)
        },
        onMouseMove: ev => {
            // If this is a mouse drag and sorting is not active,
            // initialize this sortable.
            if (!rxGet('sortable.drag').active
                && (ev.buttons === 1 || ev.buttons === 3)) {
                // Disable the menu.
                dispatch({ type: 'cellTypeCluster.menu.sorting' })
                const marker = {
                    width: '2px',
                    height: '20px',
                    topOffset: 0,
                    leftOffset: -1,
                }
                sortableOnMouseMove(
                    ev,
                    dataStore.getClusters().length,
                    DOMAIN,
                    marker,
                    reorder,
                    'x',
                    dispatch,
                )
            }
        },
        onMouseOver: ev => {
            // Clear any context elements not belonging to this domain.
            clearContextElements(DOMAIN)
            // If dragging, let the sortable know. Otherwise open the menu.
            if (rxGet('sortable.drag').active) {
                sortableOnMouseOver(ev, dispatch)
            } else {
                dispatch({
                    type: 'cellTypeCluster.menu.open',
                    value: ev.target.dataset.position,
                })
            }
        },
    }
}

const ColorBar = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default ColorBar
export { reorderColumns }
