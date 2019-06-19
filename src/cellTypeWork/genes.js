// The logic for the genes on the cell type worksheet, not the gene table.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import dataStore from 'cellTypeWork/dataStore'
import Presentation from 'cellTypeWork/genesPres'
import { sortableOnMouseDown, sortableOnMouseLeave, sortableOnMouseOver }
    from 'app/sortable'

const mapStateToProps = (state) => {
    const data = dataStore.get()
    return {
        genes: data.genes,
        dims: state.cellTypeWork.dims,
        render: state.cellTypeWork.render,
        onMouseLeave: sortableOnMouseLeave,
        onMouseOver: sortableOnMouseOver,
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
        onMouseDown: ev => {
            const geneWidth = rxGet('cellTypeWork.dims').geneWidth
            const marker = {
                width: '20px',
                height: '2px',
                topOffset: -2,
                leftOffset: geneWidth - 15,
            }
            sortableOnMouseDown(
                ev,
                dataStore.getGenes().length,
                'cellTypeWorkGenes',
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
)(Presentation)

export default Genes
