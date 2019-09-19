
// The logic for the cell type editing on the cell type worksheet page.

import { connect } from 'react-redux'
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
        showInput: state.cellTypeBar.labelInput,
        onClickAway: () => {},//clearContextElements,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAway: ev => {
            // Clear the hover cell type saved.
            dispatch({ type: 'cellTypeBar.labelInput.hide' })
        },
        onInputChange: ev => {
            // On change of the value update the value in state.
            dataStore.changeCellType(
                { label: ev.target.value }, ev.target.dataset.position)
            dispatch({ type: 'cellTypeWork.render.now' })
        },
        onMouseOver: ev => {
            // On hover over a cellType, save that position.
            dispatch({
                type: 'cellTypeBar.labelInput.show',
                value: ev.target.dataset.position
            })
            // Clear any leftover context elements.
            clearContextElements(DOMAIN)

            // Set focus to the input component.
            setTimeout(() => {
                try {
                    document.getElementById(
                        'cellTypeBarLabelInput').focus()
                } catch(e) {
                }
            }, 10)
        },
        /*
        // This need a component ref to set the focus to the new component.
        onKeyDown: ev => {
            console.log('onKeyDown, key:', ev.key)
            const position = ev.target.dataset.position
            const count = dataStore.getCellTypes().length
            console.log('position:', position)
            if (position === count - 1) {
                // We're on the last cluster, so hide all cell type inputs.
                dispatch({ type: 'cellTypeBar.labelInput.hide' })
            } else {
                dispatch({
                    type: 'cellTypeBar.labelInput.show',
                    value: position + 1,
                })
                // use a component ref?
                //setTimeout( () => { document.getElementById(
                //    'cellTypeBarLabelInput').focus() })
            }
        },
        */
    }
}

const CellTypesEdit = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypesEdit
