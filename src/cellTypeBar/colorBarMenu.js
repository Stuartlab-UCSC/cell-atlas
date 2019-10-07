// The logic for the cell type colorBar menu
// on the cell type worksheet.

import { connect } from 'react-redux'
import { buildTypeGroups } from 'cellTypeWork/transformToChart'
import Presentation from 'cellTypeBar/colorBarMenuPres'
import dataStore from 'cellTypeWork/dataStore'
import { setCellTypeInputFocus } from 'cellTypeBar/cellTypesEdit'

const mapStateToProps = (state) => {
    return {
        dims: state.cellTypeWork.dims,
        menu: state.cellTypeBar.menu, // the start and end groups & columns
    }
}

const cellTypeChangeConclusion = (cellTypes, dispatch, labelFocusPosition) => {
    // Finish up after a menu option is processed.
    // Save the new cell types.
    dataStore.setCellTypes(cellTypes)
    // Rebuild the groups and save them.
    dataStore.setTypeGroups(buildTypeGroups(cellTypes))
    // Render the new chart.
    dispatch({ type: 'cellTypeWork.render.now' })
    // Set focus to optional cell type label.
    setCellTypeInputFocus(labelFocusPosition, dispatch)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAway: ev => {
            dispatch({ type: 'cellTypeBar.menu.clickAway' })
        },
        onMapClick: ev => {
            console.log('onMapClick')
            // TODO
            // cellTypeChangeCleanUp(cellTypes, dispatch, labelFocusPosition)
        },
    }
}

const ColorBarMenu = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default ColorBarMenu
export { cellTypeChangeConclusion }
