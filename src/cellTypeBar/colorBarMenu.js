// The logic for the cell type colorBar menu
// on the cell type worksheet.

import { connect } from 'react-redux'
import { rxGet } from 'state/rx'
import { buildTypeGroups } from 'cellTypeWork/transformToChart'
import Presentation from 'cellTypeBar/colorBarMenuPres'
import dataStore from 'cellTypeWork/dataStore'

const placeholder = 'type-'

let seq = 1

const mapStateToProps = (state) => {
    return {
        dims: state.cellTypeWork.dims,
        group: state.cellTypeBar.group, // true: enable group option
        menu: state.cellTypeBar.menu, // the start and end groups & columns
    }
}

const setMenuOptions = (groupPosition, dispatch) => {
    // Set the menu options for the selection or the group being hovered over.
    let startGroup = null // start & end group indices to which the menu applies
    let endGroup = null
    let group = false   // true indicates grouping is possible
    const select = rxGet('cellTypeBar.select')
    const groups = dataStore.getTypeGroups()
    const hoverGindex = parseInt(groupPosition, 10)
    
    if (select !== null) {
        // Find the start and end group indices in the selection.
        startGroup = select[0]
        endGroup = select[1]
        if (startGroup > endGroup) {
            startGroup = select[1]
            endGroup = select[0]
        }

        // Is the hover group outside of the selection?
        if (hoverGindex < startGroup || hoverGindex > endGroup) {
            // Apply the menu to the hover group.
            startGroup = endGroup = hoverGindex

        } else { // The hover group is inside the selection
            // We can group if there is more than one group in the selection.
            group = (startGroup !== endGroup )
        }
    }
    // Save the menu properties to state.
    // Set the enable flags for the group items
    dispatch({ type: 'cellTypeBar.group.set', value: group })
    if (!group) {
        // With group option disabled, don't show the menu.
        dispatch({ type: 'cellTypeBar.menu.noValidOptions' })
        
    } else { // show the menu
        // Open the menu, saving the start and end groups and columns.
        dispatch({
            type: 'cellTypeBar.menu.open',
            value: {
                startGroup,
                endGroup,
                startCol: groups[startGroup][0],
                endCol: groups[endGroup][1],
            }
        })
    }
}

const findMenuApply = (oldGs) => {
    // Find the columns and groups to which the menu applies.
    const menu = rxGet('cellTypeBar.menu')
    return {
        startGroup: menu.startGroup,
        endGroup: menu.endGroup,
        startCol: menu.startCol,
        endCol: menu.endCol,
    }
}

const cellTypeChangeConclusion = (cellTypes, dispatch) => {
    // Finish up after a menu option is processed.
    // Save the new cell types.
    dataStore.setCellTypes(cellTypes)
    // Rebuild the groups and save them.
    dataStore.setTypeGroups(buildTypeGroups(cellTypes))
    // Remove the selection.
    dispatch({ type: 'cellTypeBar.select.optionSelected' })
    // Close the menu.
    dispatch({ type: 'cellTypeBar.menu.optionSelected' })
    // Render the new chart.
    dispatch({ type: 'cellTypeWork.render.now' })
}

const placeholderLabel = (cellTypes) => {
    // If we create a group and it has no label, we give it a placeholder label
    // because groups are defined by contiguous columns with the same label.
    const labels = cellTypes.map(type => {
        return type.label
    })
    let unique = false
    let label
    while (unique === false) {
        label = placeholder + seq
        if (labels.includes(label)) {
            seq++
        } else {
            unique = true
        }
    }
    return label
}

const onInsertGroup = (ev, dispatch) => {
    // A new cell type has been requested to be inserted into an existing group.
    // This results in the original group split with a one-column group inserted
    // in-between.
    const colPos = parseInt(ev.target.dataset.position, 10)
    const cellTypes = dataStore.getCellTypes()

    // Give the new cell type a label to differentiate it from the old group.
    const newCellTypes = cellTypes.map((type, i) => {
        return (i === colPos)
            ? { label: placeholderLabel(cellTypes) }
            : type
    })
    // Finish up.
    cellTypeChangeConclusion(newCellTypes, dispatch)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAway: ev => {
            dispatch({ type: 'cellTypeBar.menu.clickAway' })
        },
        onGroupClick: ev => {
            // "Group" was clicked on the menu, so group the selection.
            
            // Get the bounds of the selection.
            const oldGs = dataStore.getTypeGroups()
            const { startCol, endCol } = findMenuApply(oldGs)

            // Find the unique labels in the new group.
            let cellTypes = dataStore.getCellTypes()
            const typesWithLabel = cellTypes.filter((type, i) => {
                if (i < startCol || i > endCol) {
                    return false
                }
                if (type.label) {
                    return true
                }
                return false
            })
            const typesWithUniqueLabel = [...new Set(typesWithLabel)]
            
            // Only one label can be saved for the new group.
            let label
            if (typesWithUniqueLabel.length === 0) {
                label = placeholderLabel(cellTypes)
            } else if (typesWithUniqueLabel.length === 1) {
                label = typesWithUniqueLabel[0].label
            } else {
                dispatch({
                    type: 'app.snackbar.open',
                    value: "Cannot merge due to multiple labels. Remove " +
                        "all but one label then merge."
                })
                return
            }
            
            // Set all of the columns' labels the same.
            for (let i = startCol; i <= endCol; i++) {
                cellTypes[i] = { label }
            }

            // Finish up.
            cellTypeChangeConclusion(cellTypes, dispatch)
        },
    }
}

const ColorBarMenu = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default ColorBarMenu
export { cellTypeChangeConclusion, setMenuOptions, onInsertGroup }
