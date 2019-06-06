
// The worksheet logic for the cell type worksheet page.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import Presentation from 'cellTypeWork/cellTypesPres'
import { sortableOnMouseDown, sortableOnMouseLeave, sortableOnMouseOver }
    from 'app/sortable'

const mapStateToProps = (state) => {
    return {
        clusters: state.cellTypeWork.data.clusters,
        cellTypes: state.cellTypeWork.data.cellTypes,
        dims: state.cellTypeWork.dims,
        onMouseLeave: sortableOnMouseLeave,
        onMouseOver: sortableOnMouseOver,
    }
}

const reorder = (start, end) => {
    // Remove and insert the cellType in its new place in the list.
    const cellTypes = rxGet('cellTypeWork.data.cellTypes')
    const cellType = cellTypes[start]
    cellTypes.splice(start, 1)
    cellTypes.splice(end, 0, cellType)
    rxSet('cellTypeWork.data.cellTypeReorder', {value: cellTypes})
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseDown: ev => {
            const marker = {
                width: '2px',
                height: '20px',
                topOffset: -20,
                leftOffset: 3,
                transform: 'rotate(45deg)',
            }
            sortableOnMouseDown(
                ev,
                rxGet('cellTypeWork.data.cellTypes').length,
                'cellTypes',
                marker,
                reorder,
                'x',
                dispatch
            )
        },
    }
}

const CellTypes = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypes
