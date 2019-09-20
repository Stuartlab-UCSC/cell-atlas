// The logic for the cell type colorBar menu
// on the cell type worksheet.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import { buildTypeGroups } from 'cellTypeWork/transformToChart'
import Presentation from 'cellTypeBar/colorBarMenuPres'
import dataStore from 'cellTypeWork/dataStore'

const placeholder = 'placeholder-'
const mapStateToProps = (state) => {
    return {
        dims: state.cellTypeWork.dims,
        group: state.cellTypeBar.group, // true: enable group option
        menu: state.cellTypeBar.menu, // the start and end groups & columns
        ungroup: state.cellTypeBar.ungroup, // true: enable ungroup option
    }
}

const setMenuOptions = (groupPosition, dispatch) => {
    // Set the menu options for the selection or the group being hovered over.
    let startGroup = null // start & end group indices to which the menu applies
    let endGroup = null
    let group = false   // true indicates grouping is possible
    let ungroup = false // true indicates ungrouping is possible
    const select = rxGet('cellTypeBar.select')
    const groups = dataStore.getTypeGroups()
    const hoverGindex = parseInt(groupPosition, 10)
    const hoverG = groups[hoverGindex]  // the group we're hovering over
    
    if (select === null) {
        // No selection means the menu applies to the hover group.
        startGroup = endGroup = hoverGindex
        ungroup = (hoverG[0] !== hoverG[1])
        
    } else { // there is a selection
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
            ungroup = (hoverG[0] !== hoverG[1])

        } else { // The hover group is inside the selection
            // If there is more than one column in any of the selected groups,
            // then enable the ungroup menu item.
            const multiCol = groups.find((group, i) => {
                return ((i >= startGroup && i <= endGroup)
                    && (groups[i][0] !== groups[i][1]))
            })
            if (multiCol) {
                ungroup = true
            }
            // We can group if there is more than one group in the selection.
            group = (startGroup !== endGroup )
        }
    }
    // Save the menu properties to state.
    if (!group && !ungroup) {
        // With group and ungroup disabled, don't show the menu.
        dispatch({ type: 'cellTypeBar.menu.noValidOptions' })
        
    } else { // show the menu
        // Set the enable flags for the group and ungroup items
        if (group) {
            dispatch({ type: 'cellTypeBar.group.enable' })
        } else {
            dispatch({ type: 'cellTypeBar.group.disable' })
        }
        if (ungroup) {
            dispatch({ type: 'cellTypeBar.ungroup.enable' })
        } else {
            dispatch({ type: 'cellTypeBar.ungroup.disable' })
        }
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

const clickConclusion = (cellTypes, dispatch) => {
    // Finish up after and grouping or ungrouping.
    // Save the new cell types.
    dataStore.setCellTypes(cellTypes)
    // Rebuild the groups and save them.
    dataStore.setTypeGroups(buildTypeGroups(cellTypes))
    // Remove the selection.
    dispatch({ type: 'cellTypeBar.select.groupedUngrouped' })
    // Close the menu.
    dispatch({ type: 'cellTypeBar.menu.groupedUngrouped' })
    // Render the new chart.
    dispatch({ type: 'cellTypeWork.render.now' })
}

const placeholderLabel = (cellTypes) => {
    // If we create a group and it has no label, we give it a placeholder label
    // because groups are defined by contiguous columns with the same label.
    const labels = cellTypes.map(type => {
        return type.label
    })
    let seq = 1
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

            // Find all of the labels in the new group with a show flag.
            let cellTypes = dataStore.getCellTypes()
            let typesWithLabel = cellTypes.filter((type, i) => {
                if (i < startCol || i > endCol) {
                    return false
                }
                if (type.label && type.label.length > 0 && type.show) {
                    return true
                }
                return false
            })
            
            // Only one label can be saved for the new group.
            let label
            if (typesWithLabel.length === 0) {
                label = placeholderLabel(cellTypes)
            } else if (typesWithLabel.length === 1) {
                label = typesWithLabel[0].label
            } else {
                dispatch({
                    type: 'app.snackbar.open',
                    value: "Cannot group due to multiple labels. Remove " +
                        "those not wanted then group."
                })
                return
            }
            
            // Set all of columns' labels to the same label.
            for (let i = startCol; i <= endCol; i++) {
                cellTypes[i] = { label }
            }

            // Finish up.
            clickConclusion(cellTypes, dispatch)
        },
        
        onUngroupClick: ev => {
            // "Ungroup" was clicked on the menu, so ungroup the selection
            // or the group. The ungroup results in one column per group.
            // Get the start and end groups to which the menu applied.
            const oldGs = dataStore.getTypeGroups()
            const { startGroup, endGroup } = findMenuApply(oldGs)

            // Relabel the cell types.
            let cellTypes = dataStore.getCellTypes()
            let newCellTypes = []
            // Walk through the old groups.
            oldGs.forEach((group, g) => {
                if (g < startGroup || g > endGroup) {
                    // For this group outside of the selection,
                    // rewrite the labels as is.
                    for (let c = group[0]; c <= group[1]; c++) {
                        newCellTypes.push(cellTypes[c])
                    }
                } else {
                    // For this group within the selection,
                    // save the labels as unique or null.
                    let label = cellTypes[group[0]].label
                    if (label === null) {
                        // Without a label, this group has only one column,
                        // so save it's label as null.
                        newCellTypes.push({ label: null })
                    } else {
                        // Save the first label of this group with its
                        // existing label.
                        newCellTypes.push({ label })
                        // Save the rest of this group's labels as unique
                        // by appending a sequence number to the old label.
                        for (let c = group[0] + 1; c <= group[1]; c++) {
                            newCellTypes.push({
                                label: label + '-' + (c - group[0])
                            })
                        }
                    }
                }
            })
            
            // Finish up.
            clickConclusion(newCellTypes, dispatch)
        },
    }
}

const ColorBarMenu = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default ColorBarMenu
export { setMenuOptions }
