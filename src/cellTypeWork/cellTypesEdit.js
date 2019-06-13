
// The logic for the cell type editing on the cell type worksheet page.

import { connect } from 'react-redux'
import { set as rxSet } from 'state/rx'
import Presentation from 'cellTypeWork/cellTypesEditPres'

const mapStateToProps = (state) => {
    return {
        cellTypes: state.cellTypeWork.data.cellTypes,
        dims: state.cellTypeWork.dims,
        showButton: state.cellTypeWork.cellTypeButton,
        showInput: state.cellTypeWork.cellTypeInput,
    }
}

const onBodyClickForButton = ev => {
    // Hide the button if the user clicks almost anywhere.
    document.body.removeEventListener('click', onBodyClickForButton)
    if (ev.target.id !== 'cellTypeWorkCellTypeEditButton') {
        rxSet('cellTypeWork.cellTypeButton.hide')
    }
}

const onBodyClickForInput = ev => {
    // Hide the input if the user clicks almost anywhere.
    document.body.removeEventListener('click', onBodyClickForInput)
    if (ev.target.id !== 'cellTypeWorkCellTypeEditInput') {
        rxSet('cellTypeWork.cellTypeInput.hide')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onButtonClick: ev => {
            // On the button click, hide the button and show the input element.
            // Note that the icon itself cannot store a position, so grab that
            // from the parent.
            const parent =
                document.getElementById('cellTypeWorkCellTypeEditButton')
            dispatch({
                type: 'cellTypeWork.cellTypeButton.hide',
            })
            document.body.removeEventListener('click', onBodyClickForButton)
            dispatch({
                type: 'cellTypeWork.cellTypeInput.show',
                value: parent.dataset.position
            })
            // Add a listener for a click anywhere so we can hide the input
            // element. The onBlur event on the input element is not generated
            // until the user changes focus to another element by clicking, or
            // using keyboard navigation. In the mean time the input element
            // appears and disappears as it is moused over.
            document.body.addEventListener('click', onBodyClickForInput)
            // Set focus to the input element after it has a chance to render.
            setTimeout(() => {
                document.getElementById('cellTypeWorkCellTypeEditInput').focus()
            })
        },
        onButtonMouseLeave: ev => {
            // On mouse leaving the button, remove the text highlight.
            dispatch({
                type: 'cellTypeWork.cellTypeHighlight.hide',
            })
         },
        onButtonMouseOver: ev => {
            // On mouse over the button, keep the text highlighted.
            dispatch({
                type: 'cellTypeWork.cellTypeHighlight.show',
                value: ev.target.dataset.position
            })
        },
        onInputBlur: ev => {
            // On loss of focus on input component, hide it.
            dispatch({
                type: 'cellTypeWork.cellTypeInput.hide',
            })
            document.body.removeEventListener('click', onBodyClickForInput)
        },
        onInputChange: ev => {
            // On change of the value update the value in state.
            dispatch({
                type: 'cellTypeWork.data.cellTypeChange',
                position: ev.target.dataset.position,
                value: ev.target.value,
            })
        },
    }
}

const CellTypesEdit = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypesEdit
export { onBodyClickForButton }
