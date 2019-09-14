
// The logic for the svg cell types on the cell type worksheet page.

import { connect } from 'react-redux'
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

const CellTypes = connect(
    mapStateToProps
)(Presentation)

export default CellTypes
export { DOMAIN }
