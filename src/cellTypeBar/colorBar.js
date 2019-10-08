// The logic for the cell type colorBar
// on the cell type worksheet.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import { sortableOnMouseMove, sortableOnMouseOver } from 'helpers/sortable'
import dataStore from 'cellTypeWork/dataStore'
import { reorderColumns } from 'cellTypeCluster/clusterBar'
import { clearContextElements } from 'cellTypeWork/worksheet'
import Presentation from 'cellTypeBar/colorBarPres'

const DOMAIN = 'cellTypeBar'

const mapStateToProps = (state) => {
    return {
        cellTypes: dataStore.getCellTypes(),
        colormap: state.cellTypeWork.colormap,
        dims: state.cellTypeWork.dims,
        domain: DOMAIN,
        render: state.cellTypeWork.render,
        sorting: (state.sortable.drag.active),
        typeGroups: dataStore.getTypeGroups(),
    }
}

const reorder = (newG, oldG) => {
    // After a move, find the new order given a new and old group position.
    
    // Build an array of the old group positions indexed by the new positions.
    const oldGroups = dataStore.getTypeGroups()
    let order = [...Array(oldGroups.length).keys()]
    order.splice(newG, 1)
    order.splice(oldG, 0, newG)
    
    // Find the new groups with each group still containing its old
    // column range.
    const newGroups = oldGroups.map((group, oldG) => {
        return oldGroups[order[oldG]]
    })
    
    // Build an array of the old column positions indexed by the new positions.
    order = []
    newGroups.forEach(group => {
        for (let j = group[0]; j <= group[1]; j++) {
            order.push(j)
        }
    })
    
    // Reorder the columns given the new column order.
    reorderColumns(order)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseMove: ev => {
            // If this is a mouse drag and sorting is not active,
            // initialize this sortable.
            if (!rxGet('sortable.drag').active
                && (ev.buttons === 1 || ev.buttons === 3)) {
                // Disable the menu.
                dispatch({ type: 'cellTypeBar.menu.sorting' })
                const marker = {
                    width: '2px',
                    height: '20px',
                    topOffset: -10,
                    leftOffset: -1,
                }
                sortableOnMouseMove(
                    ev,
                    dataStore.getTypeGroups().length,
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
            const position = ev.target.dataset.position
            const typeGroups = dataStore.getTypeGroups()
            const startCol = typeGroups[position][0]
            const endCol = typeGroups[position][1]

            // If dragging, let the sortable know.
            // Otherwise set the menu options.
            if (rxGet('sortable.drag').active) {
                sortableOnMouseOver(ev, dispatch)
            } else {
                dispatch({
                    type: 'cellTypeBar.menu.open',
                    value: { startCol, endCol }
                })
            }
        },
    }
}

const ColorBar = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default ColorBar
export { DOMAIN }
