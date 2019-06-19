
// The logic for the cell type editing on the cell type worksheet page.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import dataStore from 'cellTypeWork/dataStore'
import Presentation from 'cellTypeWork/cellTypesEditPres'
import { DOMAIN } from 'cellTypeWork/cellTypes'

const mapStateToProps = (state) => {
    return {
        cellTypes: dataStore.getCellTypes(),
        clusterCount: dataStore.getClusters().length,
        dims: state.cellTypeWork.dims,
        mode: state.cellTypeWork.cellTypeMode,
        render: state.cellTypeWork.render,
        showButton: state.cellTypeWork.cellTypeButton,
        showInput: state.cellTypeWork.cellTypeInput,
    }
}

const onBodyClick = ev => {
    // If the user clicks anywhere other than the cell type button or message,
    // hide the button, set the mode to the default of 'readOnly'.
    if (!ev.target) {
        return
    }
    if (rxGet('cellTypeWork.cellTypeMode') === 'select') {
        // Click on the button or a cell type is ignored when in select mode.
        if (ev.target.id === 'cellTypeWorkCellTypeButton'
            || ev.target.dataset.domain === DOMAIN) {
            return
        }
    } else {
        const parent = ev.target.parentElement
        if (parent && parent.id === 'cellTypeWorkCellTypeButton') {
            // Click on the button in readOnly mode is ignored.
            return
        }
    }
    document.body.removeEventListener('click', onBodyClick)
    rxSet('cellTypeWork.cellTypeButton.hide')
    rxSet('cellTypeWork.cellTypeInput.hide')
    rxSet('cellTypeWork.cellTypeMode.readOnly')
}

const mapDispatchToProps = (dispatch) => {
    return {
        onButtonClick: ev => {
            // On click of the edit button
            // change the cell type mode from 'readOnly' to 'select'.
            if (rxGet('cellTypeWork.cellTypeMode') === 'readOnly') {
                dispatch({
                    type: 'cellTypeWork.cellTypeMode.select',
                })
                // Add a listener for a click anywhere so we can hide the input
                // element and button.
                document.body.addEventListener('click', onBodyClick)
            }
        },
        onInputChange: ev => {
            // On change of the value update the value in state.
            dataStore.changeCellType(
                ev.target.value, ev.target.dataset.position)
            dispatch({ type: 'cellTypeWork.render.now' })
        },
    }
}

const CellTypesEdit = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypesEdit
export { onBodyClick }
