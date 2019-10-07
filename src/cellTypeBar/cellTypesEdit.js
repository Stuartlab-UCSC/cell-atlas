
// The logic for the cell type editing on the cell type worksheet page.

import { connect } from 'react-redux'
import { rxGet } from 'state/rx'
import dataStore from 'cellTypeWork/dataStore'
import Presentation from 'cellTypeBar/cellTypesEditPres'
import { clearContextElements } from 'cellTypeWork/worksheet'
import { cellTypeChangeConclusion } from 'cellTypeBar/colorBarMenu'
import { DOMAIN } from 'cellTypeBar/cellTypes'

const mapStateToProps = (state) => {
    return {
        cellTypes: dataStore.getCellTypes(),
        clusterCount: dataStore.getClusters().length,
        dims: state.cellTypeWork.dims,
        render: state.cellTypeWork.render,
        position: state.cellTypeBar.labelInput,
        onClickAway: () => {},//clearContextElements,
    }
}

const setCellTypeInputFocus = (position, dispatch) => {
    if (position === undefined) {
        return
    }
    dispatch({
        type: 'cellTypeBar.labelInput.open',
        value: parseInt(position, 10)
    })
    // Try to set focus to the input component.
    setTimeout(() => {
        const el = document.getElementById('cell_type_label_input')
        if (el) {
            el.focus()
        }
    }, 200)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInputChange: ev => {
            // On change of the text value update the value in state.
            let label = ev.target.value
            if (label === null || label === undefined) {
                label = ''
            }
            // Update all of the labels in this group.
            const group = dataStore.getTypeGroups().find(group => {
                return group[0] === rxGet('cellTypeBar.labelInput')
            })
            let cellTypes = dataStore.getCellTypes()
            for (let c = group[0]; c <= group[1]; c++) {
                cellTypes[c].label = label
            }
            dataStore.setCellTypes(cellTypes)
            dispatch({ type: 'cellTypeWork.render.now' })
        },
        onMouseLeave: ev => {
            // The mouse has left the text input.
            dispatch({ type: 'cellTypeBar.labelInput.close' })
            cellTypeChangeConclusion(dataStore.getCellTypes(), dispatch)
        },
        onMouseOver: ev => {
            // On hover over a cellType, save that position.
            // Clear any leftover context elements.
            clearContextElements(DOMAIN)

            setCellTypeInputFocus(ev.target.dataset.position, dispatch)
        },
    }
}

const CellTypesEdit = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypesEdit
export { setCellTypeInputFocus }
