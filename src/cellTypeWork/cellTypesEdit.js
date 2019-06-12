
// The logic for the cell type editing on the cell type worksheet page.

import { connect } from 'react-redux'
import Presentation from 'cellTypeWork/cellTypesEditPres'

const mapStateToProps = (state) => {
    return {
        cellTypes: state.cellTypeWork.data.cellTypes,
        dims: state.cellTypeWork.dims,
        showButton: state.cellTypeWork.cellTypeButton,
        showInput: state.cellTypeWork.cellTypeInput,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: ev => {
            // On the button click, hide the button and show the input element.
            dispatch({
                type: 'cellTypeWork.cellTypeButton.hide',
            })
            dispatch({
                type: 'cellTypeWork.cellTypeInput.show',
                value: ev.target.dataset.position
            })
        },
        onChange: ev => {
            // On change of the value update the value in state.
            dispatch({
                type: 'cellTypeWork.data.cellTypeChange',
                position: ev.target.dataset.position,
                value: ev.target.value,
            })
        },
        onInputLeave: ev => {
            dispatch({
                type: 'cellTypeWork.cellTypeInput.hide',
            })
        },
        onMouseOverButton: ev => {
            // On mouse over the button, keep the text highlighted.
            dispatch({
                type: 'cellTypeWork.cellTypeHighlight.show',
                value: ev.target.dataset.position
            })
        },
        onMouseLeaveButton: ev => {
            // On mouse leaving the button, remove the text highlight.
            dispatch({
                type: 'cellTypeWork.cellTypeHighlight.hide',
            })
        },
    }
}

const CellTypesEdit = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypesEdit
