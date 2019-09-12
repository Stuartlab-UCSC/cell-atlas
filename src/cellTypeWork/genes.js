// The logic for the genes on the cell type worksheet, not the gene table.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import dataStore from 'cellTypeWork/dataStore'
import GenePresentation from 'cellTypeWork/genesPres'
import { sortableOnMouseDown, sortableOnMouseOver } from 'app/sortable'
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
    dataStore.reorderGenes(sortee)
    rxSet('cellTypeWork.render.now')
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseDown: ev => {
            // Close the usual hover items.
            clearContextElements()
            // Save the info for this item for sortable drag and drop.
            const { geneWidth, rowHeight } = rxGet('cellTypeWork.dims')
            const marker = {
                width: '20px',
                height: '2px',
                topOffset: -rowHeight - 2,
                leftOffset: geneWidth - 15,
            }
            sortableOnMouseDown(
                ev,
                dataStore.getGenes().length,
                DOMAIN,
                marker,
                reorder,
                'y',
                dispatch,
            )
        },
        onMouseLeave: ev => {
            clearContextElements(DOMAIN)
        },
        onMouseOver: ev => {
            // Clear any context elements not belonging to this domain.
            clearContextElements(DOMAIN)
            sortableOnMouseOver(ev, dispatch, 'cellTypeWork.geneMenu.open')
        },
        onRemoveClick: ev => {
            // Close the context menu.
            clearContextElements()

            // Remove the gene's row from the worksheet.
            removeGeneBubbles(ev.target.dataset.position)
        },
        onScatterClick: ev => {
            getGeneScatterPlot(ev.target.dataset.gene)
            clearContextElements()
        }
    }
}

const Genes = connect(
    mapStateToProps, mapDispatchToProps
)(GenePresentation)

export default Genes
