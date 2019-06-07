// The logic for the clusters and their info on the cell type worksheet.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import Presentation from 'cellTypeWork/genesPres'
import { sortableOnMouseDown, sortableOnMouseLeave, sortableOnMouseOver }
    from 'app/sortable'

const mapStateToProps = (state) => {
    const data = state.cellTypeWork.data
    return {
        genes: data.genes,
        dims: state.cellTypeWork.dims,
        onMouseLeave: sortableOnMouseLeave,
        onMouseOver: sortableOnMouseOver,
    }
}

const reorder = (start, end) => {
    // Remove and insert the gene row in its new place in the list.
    const genes = rxGet('cellTypeWork.data.genes')
    const gene = genes[start]
    genes.splice(start, 1)
    genes.splice(end, 0, gene)
    rxSet('cellTypeWork.data.geneReorder', {value: genes})
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
                rxGet('cellTypeWork.data.genes').length,
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
