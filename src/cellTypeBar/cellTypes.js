
// The logic for the svg cell types on the cell type worksheet page.

import { connect } from 'react-redux'
import { set as rxSet } from 'state/rx'
import Presentation from 'cellTypeBar/cellTypesPres'
import dataStore from 'cellTypeWork/dataStore'

const DOMAIN = 'cellTypeBarLabels'

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

const CellTypes = connect(
    mapStateToProps
)(Presentation)

export default CellTypes
export { DOMAIN, reorder }
