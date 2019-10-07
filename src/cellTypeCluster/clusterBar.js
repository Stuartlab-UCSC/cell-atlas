// The logic for the cluster bar for the cell type workbench.

import { connect } from 'react-redux'
import Presentation from 'cellTypeCluster/clusterBarPres'
import { sortableOnMouseMove, sortableOnMouseOver } from 'app/sortable'
import { rxGet } from 'state/rx'
import { onSelectClick } from 'helpers/select'
import dataStore from 'cellTypeWork/dataStore'
import { clearContextElements } from 'cellTypeWork/worksheet'
import { reorderColumns } from 'cellTypeCluster/cluster'
import { setMenuOptions } from 'cellTypeCluster/clusterBarMenu'

const DOMAIN = 'cellTypeCluster'

const mapStateToProps = (state) => {
    return {
        clusters: dataStore.getClusters(),
        colormap: state.cellTypeWork.colormap,
        dims: state.cellTypeWork.dims,
        render: state.cellTypeWork.render,
        select: state.cellTypeCluster.select,
        sorting: (state.sortable.drag.active),
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
        onClick: ev => {
            // This is a click to select/deselect clusters.
            onSelectClick(ev, DOMAIN, dispatch)
            const position = parseInt(ev.target.dataset.position, 10)
            
            // Allow time for the selection to be recorded in state
            // before setting the menu options.
            setTimeout(() => setMenuOptions(position, dispatch))
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
            // If sorting is active, update the display for this cluster.
            // Otherwise set the menu options and display it.
            // Clear any context elements not belonging to this domain.
            clearContextElements(DOMAIN)
            // If dragging, let the sortable know. Otherwise open the menu.
            if (rxGet('sortable.drag').active) {
                sortableOnMouseOver(ev, dispatch)
            } else {
                setMenuOptions(ev.target.dataset.position, dispatch)
            }
        },
    }
}

const ColorBar = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default ColorBar
export { reorderColumns }
