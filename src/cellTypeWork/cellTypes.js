
// The logic for the svg cell types on the cell type worksheet page.

import { connect } from 'react-redux'
import { set as rxSet } from 'state/rx'
import Presentation from 'cellTypeWork/cellTypesPres'
import dataStore from 'cellTypeWork/dataStore'

const DOMAIN = 'cellTypeWorkCellTypes'

const mapStateToProps = (state) => {
    return {
        colormap: state.cellTypeWork.colormap,
        cellTypes: dataStore.getCellTypes(),
        dims: state.cellTypeWork.dims,
        render: state.cellTypeWork.render,
    }
}

const reorder = (start, end) => {
    // Remove and insert the cellType in its new place in the list.
    const cellTypes = dataStore.getCellTypes()
    const cellType = cellTypes[start]
    cellTypes.splice(start, 1)
    cellTypes.splice(end, 0, cellType)
    dataStore.reorderCellTypes(cellTypes)
    rxSet('cellTypeWork.render.now')
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseOver: ev => {
            // On hover over a cellType, save that position.
            dispatch({
                type: 'cellTypeWork.cellTypeInput.show',
                value: ev.target.dataset.position
            })
            // Hide any context menu open.
            dispatch({
                type: 'cellTypeWork.contextMenu.closeFromCellTypeHover' })
            
            // Set focus to the input component.
            setTimeout(() => {
                try {
                    document.getElementById(
                        'cellTypeWorkCellTypeEditInput').focus()
                } catch(e) {
                }
            }, 10)

        },
    }
}

const CellTypes = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypes
export { DOMAIN, reorder }
