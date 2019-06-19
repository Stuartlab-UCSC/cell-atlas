
// The logic for the svg cell types on the cell type worksheet page.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import { onBodyClick } from 'cellTypeWork/cellTypesEdit'
import Presentation from 'cellTypeWork/cellTypesPres'
import { sortableOnMouseDown, sortableOnMouseLeave, sortableOnMouseOver }
    from 'app/sortable'
import dataStore from 'cellTypeWork/dataStore'

const DOMAIN = 'cellTypeWorkCellTypes'

const mapStateToProps = (state) => {
    return {
        colormap: state.cellTypeWork.colormap,
        cellTypes: dataStore.getCellTypes(),
        dims: state.cellTypeWork.dims,
        mode: state.cellTypeWork.cellTypeMode,
        render: state.cellTypeWork.render,
        showHighlight: state.cellTypeWork.cellTypeHighlight,
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
        onClick: ev => {
            // On click of a cellType, save that position.
            dispatch({
                type: 'cellTypeWork.cellTypeInput.show',
                value: ev.target.dataset.position
            })
            setTimeout(() => {
                try {
                    document.getElementById(
                        'cellTypeWorkCellTypeEditInput').focus()
                } catch(e) {
                }
            }, 10)
        },
        onMouseOver: ev => {
            // On mouse over the text, highlight the text and
            // show the button if the mouse is not being dragged.
            if (rxGet('sortable.drag').domain === null) {
                dispatch({
                    type: 'cellTypeWork.cellTypeHighlight.show',
                    value: ev.target.dataset.position
                })
                dispatch({
                    type: 'cellTypeWork.cellTypeButton.show'
                })
                document.body.addEventListener('click', onBodyClick)
            }
            // Handle the sortable drag and drop.
            sortableOnMouseOver(ev)
        },
        onMouseLeave: ev => {
            // On mouse leave from the text, remove the text highlight.
            dispatch({
                type: 'cellTypeWork.cellTypeHighlight.hide'
            })
            // Handle the sortable drag and drop.
            sortableOnMouseLeave(ev)
        },
        onMouseDown: ev => {
            // Save the info for this cellType for sortable drag and drop.
            const marker = {
                width: '2px',
                height: '20px',
                topOffset: -15,
                leftOffset: 12,
                transform: 'rotate(45deg)',
            }
            sortableOnMouseDown(
                ev,
                dataStore.getCellTypes().length,
                DOMAIN,
                marker,
                reorder,
                'x',
                dispatch
            )
        },
    }
}

const CellTypes = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypes
export { DOMAIN, reorder }
