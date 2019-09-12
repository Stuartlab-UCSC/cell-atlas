// The logic for the cell type colorBar
// on the cell type worksheet.

import { connect } from 'react-redux'
import { sortableOnMouseDown, sortableOnMouseOver } from 'app/sortable'
import dataStore from 'cellTypeWork/dataStore'
import { scatterColumnsReordered } from 'cellTypeScatter/scatter'
import { clearContextElements } from 'cellTypeWork/worksheet'
import { reorder as cellTypeReorder } from 'cellTypeBar/cellTypes'
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

const reorder = (start, end) => {
    // Remove and insert the item in its new place in the list.
    const sortee = dataStore.getTypeGroups()
    const item = sortee[start]
    sortee.splice(start, 1)
    sortee.splice(end, 0, item)
    dataStore.reorderTypeGroups(sortee)
    // TODO update the cluster order.
    // TODO update the cell type labels for groups greater than one
    cellTypeReorder(start, end)
    // Update the scatter plot to the new colors.
    scatterColumnsReordered()
    //rxSet('cellTypeWork.render.now')
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
