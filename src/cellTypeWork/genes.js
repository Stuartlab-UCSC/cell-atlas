// The logic for the genes on the cell type worksheet, not the gene table.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import dataStore from 'cellTypeWork/dataStore'
import GenePresentation from 'cellTypeWork/genesPres'
import { sortableOnMouseDown, sortableOnMouseOver } from 'app/sortable'
//import { getGeneScatterPlot } from 'cellTypeScatter/scatterPlot'
import { clearContextElements } from 'cellTypeWork/worksheet'
import { removeGeneBubbles } from 'cellTypeWork/transformToBubbles'

const DOMAIN = 'cellTypeWorkGenes'

const mapStateToProps = (state) => {
    return {
        genes: dataStore.getGenes(),
        dims: state.cellTypeWork.dims,
        menuPosition: state.cellTypeWork.geneMenu,
        render: state.cellTypeWork.render,
        sorting: (state.sortable.drag.count !== null),
        onMenuClickAway: clearContextElements,
    }
}

const reorder = (start, end) => {
    // Remove and insert the gene row in its new place in the list.
    const genes = dataStore.getGenes()
    const gene = genes[start]
    genes.splice(start, 1)
    genes.splice(end, 0, gene)
    dataStore.reorderGenes(genes)
    rxSet('cellTypeWork.render.now')
}

const mapDispatchToProps = (dispatch) => {
    return {
        onScatterPlotClick: ev => {
            // Save the gene name.
            console.log('onScatterPlotClick: position:',
                ev.target.dataset.position)
            //const gene = dataStore.getGenes()[ev.target.dataset.position]
            
            // Get the scatter plot from the data server.
            //getGeneScatterPlot(gene)
            
            // Close the context menu.
            clearContextElements()
        },
        onRemoveClick: ev => {
            console.log('genes onRemoveClick 1')
            // Close the context menu.
            clearContextElements()
            console.log('genes onRemoveClick 2')

            // Remove the gene's row from the worksheet.
            removeGeneBubbles(ev.target.dataset.position)
            console.log('genes onRemoveClick 3')
        },
        onMouseLeave: ev => {
            clearContextElements(DOMAIN)
        },
        onMouseOver: ev => {
            // Clear any context elements not belonging to genes.
            clearContextElements(DOMAIN)
            
            // If we're sorting, handle the drag event.
            if (rxGet('sortable.drag').count !== null) {
                sortableOnMouseOver(ev)
            } else {
                // The elements are not being sorted, so show the context menu.
                dispatch({
                    type: 'cellTypeWork.geneMenu.open',
                    position: ev.target.dataset.position
                })
            }
        },
        onMouseDown: ev => {
            // Close the context menu.
            clearContextElements()
            // Save the info for this gene for sortable drag and drop.
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
    }
}

const Genes = connect(
    mapStateToProps, mapDispatchToProps
)(GenePresentation)

export default Genes
