// The logic for the cell type colorBar
// on the cell type worksheet.

import { connect } from 'react-redux'
import { sortableOnMouseDown, sortableOnMouseOver } from 'app/sortable'
import dataStore from 'cellTypeWork/dataStore'
import { reorderColumns } from 'cellTypeWork/clusters'
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
    // Find the new order given a new and old group position.
    
    // Find the number of columns in the moved group.
    const oldGroups = dataStore.getTypeGroups()

    // Build an array of the old group positions indexed by the new positions.
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
        onClick: ev => {
        },
        onMouseDown: ev => {
            // Close all context elements.
            clearContextElements()
            // Save the info for this item for sortable drag and drop.
                const marker = {
                    width: '2px',
                    height: '20px',
                    topOffset: -10,
                    leftOffset: -1,
                }
                sortableOnMouseDown(
                    ev,
                    dataStore.getTypeGroups().length,
                    DOMAIN,
                    marker,
                    reorder,
                    'x',
                    dispatch,
                )
        },
        onMouseLeave: ev => {
            clearContextElements(DOMAIN)
        },
        onMouseOver: ev => {
            // Clear any context elements not belonging to this domain.
            clearContextElements(DOMAIN)
            sortableOnMouseOver(ev, dispatch)
        },
    }
}

const ColorBar = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default ColorBar
export { DOMAIN }
