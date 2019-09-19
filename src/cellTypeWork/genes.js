// The logic for the genes on the cell type worksheet, not the gene table.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import dataStore from 'cellTypeWork/dataStore'
import GenePresentation from 'cellTypeWork/genesPres'
import { sortableOnMouseMove, sortableOnMouseOver } from 'app/sortable'
import { getGeneScatterPlot } from 'cellTypeScatter/scatter'
import { clearContextElements } from 'cellTypeWork/worksheet'
import { removeGeneBubbles } from 'cellTypeWork/transformToBubbles'

const DOMAIN = 'cellTypeWorkGenes'

const mapStateToProps = (state) => {
    return {
        genes: dataStore.getGenes(),
        dims: state.cellTypeWork.dims,
        menuPosition: state.cellTypeWork.geneMenu,
        render: state.cellTypeWork.render,
        sorting: (state.sortable.drag.active),
        onMenuClickAway: clearContextElements,
    }
}

const reorder = (start, end) => {
    // Remove and insert the item in its new place in the list.
    const sortee = dataStore.getGenes()
    const item = sortee[start]
    sortee.splice(start, 1)
    sortee.splice(end, 0, item)
    dataStore.setGenes(sortee)
    rxSet('cellTypeWork.render.now')
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseMove: ev => {
            // On a mouse drag, if sorting is not active,
            // initialize this sortable.
            if (!rxGet('sortable.drag').active
                && (ev.buttons === 1 || ev.buttons === 3)) {
                // Disable the menu.
                dispatch({ type: 'cellTypeWork.geneMenu.sorting' })
                const { geneWidth, rowHeight } = rxGet('cellTypeWork.dims')
                const marker = {
                    width: '20px',
                    height: '2px',
                    topOffset: -rowHeight - 2,
                    leftOffset: geneWidth - 15,
                }
                sortableOnMouseMove(
                    ev,
                    dataStore.getGenes().length,
                    DOMAIN,
                    marker,
                    reorder,
                    'y',
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
                    type: 'cellTypeWork.geneMenu.open',
                    value: ev.target.dataset.position,
                })
            }
        },
        onRemoveClick: ev => {
            // Remove the gene's row from the worksheet.
            removeGeneBubbles(ev.target.dataset.position)
            // Close the context menu.
            dispatch({ type: 'cellTypeWork.geneMenu.remove' })
        },
        onScatterClick: ev => {
            // Get the gene's scatterplot from the server.
            getGeneScatterPlot(ev.target.dataset.gene)
            // Close the context menu.
            dispatch({ type: 'cellTypeWork.geneMenu.scatter' })
        }
    }
}

const Genes = connect(
    mapStateToProps, mapDispatchToProps
)(GenePresentation)

export default Genes
