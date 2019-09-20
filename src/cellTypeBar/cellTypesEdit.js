
// The logic for the cell type editing on the cell type worksheet page.

import { connect } from 'react-redux'
import { rxGet } from 'state/rx'
import dataStore from 'cellTypeWork/dataStore'
import Presentation from 'cellTypeBar/cellTypesEditPres'
import { clearContextElements } from 'cellTypeWork/worksheet'
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

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAway: ev => {
            // Close the cellType label input.
            dispatch({ type: 'cellTypeBar.labelInput.close' })
        },
        onInputChange: ev => {
            // On change of the text value update the value in state.
            dataStore.changeCellType(
                ev.target.value, ev.target.dataset.position)
        },
        onMouseLeave: ev => {
            // The mouse has left the text input.
            // Render to show the new cell type under the input element.
            dispatch({ type: 'cellTypeWork.render.now' })
            // Update all of the labels in this group.
            const group = dataStore.getTypeGroups().find(group => {
                return group[0] === rxGet('cellTypeBar.labelInput')
            })
            let cellTypes = dataStore.getCellTypes()
            const label = cellTypes[group[0]].label
            for (let c = group[0] + 1; c <= group[1]; c++) {
                cellTypes[c].label = label
            }
            dataStore.setCellTypes(cellTypes)
        },
        onMouseOver: ev => {
            // On hover over a cellType, save that position.
            dispatch({
                type: 'cellTypeBar.labelInput.open',
                value: ev.target.dataset.position
            })
            // Clear any leftover context elements.
            clearContextElements(DOMAIN)

            // Try to set focus to the input component.
            setTimeout(() => {
                const el = document.getElementById('cellTypeBarLabelInput')
                if (el) {
                    el.focus()
                }
            }, 200)
        },
    }
}

const CellTypesEdit = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypesEdit
