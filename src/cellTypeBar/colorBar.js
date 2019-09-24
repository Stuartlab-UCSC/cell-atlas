// The logic for the cell type colorBar
// on the cell type worksheet.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import { sortableOnMouseMove, sortableOnMouseOver } from 'app/sortable'
import dataStore from 'cellTypeWork/dataStore'
import { reorderColumns } from 'cellTypeCluster/clusters'
import { clearContextElements } from 'cellTypeWork/worksheet'
import { setMenuOptions } from 'cellTypeBar/colorBarMenu'
import Presentation from 'cellTypeBar/colorBarPres'

const DOMAIN = 'cellTypeBar'

const mapStateToProps = (state) => {
    return {
        cellTypes: dataStore.getCellTypes(),
        colormap: state.cellTypeWork.colormap,
        dims: state.cellTypeWork.dims,
        domain: DOMAIN,
        render: state.cellTypeWork.render,
        select: state.cellTypeBar.select,
        sorting: (state.sortable.drag.active),
        typeGroups: dataStore.getTypeGroups(),
    }
}

const reorder = (newG, oldG) => {
    // After a move, find the new order given a new and old group position.
    
    // Build an array of the old group positions indexed by the new positions.
    const oldGroups = dataStore.getTypeGroups()
    let order = [...Array(oldGroups.length).keys()]
    order.splice(newG, 1)
    order.splice(oldG, 0, newG)
    
    // Find the new groups with each group still containing its old
    // column range.
    const newGroups = oldGroups.map((group, oldG) => {
        return oldGroups[order[oldG]]
    })
    
    // Transform any selection to the new group indices.
    let select = rxGet('cellTypeBar.select')
    if (select !== null) {
        select = [
            order[select[0]],
            order[select[1]],
        ]
    }
    // Build an array of the old column positions indexed by the new positions.
    order = []
    newGroups.forEach(group => {
        for (let j = group[0]; j <= group[1]; j++) {
            order.push(j)
        }
    })
    
    // Reorder the columns given the new column order.
    reorderColumns(order)
    
    // Save state of any group selection to the new positions.
    if (select !== null) {
        rxSet('cellTypeBar.select.reorder', { value: select })
    }
}

const moreThanOneSelected = () => {
    // Determine whether any selection contains multiple groups.
    const select = rxGet('cellTypeBar.select')
    if (select === null || select[0] === select[1]) {
        return false
    }
    rxSet('app.snackbar.open', {value: "I haven't learned how to move " +
        "multiple cell type groups. Unselect then move one group."
    })
    return true
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: ev => {
            // This is a click for select or deselect.
            // Note this is only hit on a click without the mouse held down.
            const groupPosition = parseInt(ev.target.dataset.position, 10)
            const select = rxGet('cellTypeBar.select')

            if (ev.shiftKey) {
                // Save the end position of the selection,
                // if there is already a selection.
                if (select !== null) {
                    dispatch({
                        type: 'cellTypeBar.select.end',
                        value: groupPosition,
                    })
                }
                
            } else if (select === null) {
                // With no current selection, save the begin position.
                dispatch({
                    type: 'cellTypeBar.select.begin',
                    value: groupPosition,
                })
                
            } else if (groupPosition >= Math.min(select[0], select[1])
                && groupPosition <= Math.max(select[0], select[1])) {
                // A click on the current selection, so deselect it.
                dispatch({ type: 'cellTypeBar.select.deselect' })
                
            } else {
                // A click outside of the current selection,
                // so select this new group.
                dispatch({
                    type: 'cellTypeBar.select.reselect',
                    value: groupPosition
                })
            }
            
            // Allow time for the selection to be recorded in state
            // before setting the menu options.
            setTimeout(() => setMenuOptions(groupPosition, dispatch))
        },
        onMouseMove: ev => {
            // If this is a mouse drag and sorting is not active,
            // initialize this sortable.
            if (!rxGet('sortable.drag').active
                && (ev.buttons === 1 || ev.buttons === 3)) {
                // If there is a selection of more than one group,
                // we can't handle that yet.
                if (moreThanOneSelected()) {
                    return
                }
                // Disable the menu.
                dispatch({ type: 'cellTypeBar.menu.sorting' })
                const marker = {
                    width: '2px',
                    height: '20px',
                    topOffset: -10,
                    leftOffset: -1,
                }
                sortableOnMouseMove(
                    ev,
                    dataStore.getTypeGroups().length,
                    DOMAIN,
                    marker,
                    reorder,
                    'x',
                    dispatch,
                )
            }
        },
        onMouseOver: ev => {
            // Clear any context elements not belonging to this domain.
            clearContextElements(DOMAIN)
            const position = ev.target.dataset.position

            // If dragging, let the sortable know.
            // Otherwise set the menu options.
            if (rxGet('sortable.drag').active) {
                sortableOnMouseOver(ev, dispatch)
            } else {
                setMenuOptions(position, dispatch)
            }
        },
    }
}

const ColorBar = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default ColorBar
export { DOMAIN }
