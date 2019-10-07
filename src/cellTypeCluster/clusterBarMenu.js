
// The logic for the cluster colorBar menu
// on the cell type worksheet.

import { connect } from 'react-redux'
import { rxGet } from 'state/rx'
import dataStore from 'cellTypeWork/dataStore'
import getGeneTableData from 'cellTypeGene/ctgFetch'
import Presentation from 'cellTypeCluster/clusterBarMenuPres'
import { cellTypeChangeConclusion } from 'cellTypeBar/colorBarMenu'

const placeholder = 't'

let seq = 1

const mapStateToProps = (state) => {
    return {
        dims: state.cellTypeWork.dims,
        geneStats: state.cellTypeCluster.geneStats, // true: enable stats
        selectInfo: state.cellTypeCluster.selectInfo, // true: enable info
        menu: state.cellTypeCluster.menu, // the start and end groups & columns
        makeType: state.cellTypeCluster.makeType, // true: enable make type
    }
}

const setMenuOptions = (positionIn, dispatch) => {
    // Set the menu options for the selection being hovered over.
    const position = parseInt(positionIn, 10)
    const select = rxGet('cellTypeCluster.select')
    let startCol = position
    let endCol = position
    if (select !== null) {
        // Find the start and end group indices in the selection.
        let startSelect = Math.min(select[0], select[1])
        let endSelect = Math.max(select[0], select[1])
        if (position >= startSelect && position <= endSelect) {
            startCol = startSelect
            endCol = endSelect
        }
    }
    
    // Set the enable flags for each menu option.
    dispatch({type: 'cellTypeCluster.geneStats.set',
        value: (startCol === endCol) })
    dispatch({ type: 'cellTypeCluster.selectInfo.set',
        value: (select === null) })
    dispatch({ type: 'cellTypeCluster.makeType.set',
        value: (position >= startCol || position <= endCol) })

    // Open the menu, saving the start and end columns.
    dispatch({
        type: 'cellTypeCluster.menu.open',
        value: {
            startCol: startCol,
            endCol: endCol,
        }
    })
}

const cellTypeChangeCleanUp = (cellTypes, dispatch, focusLabelIndex) => {
    // Finish up after a menu option is processed.
    // Remove the selection from the cluster menu.
    dispatch({ type: 'cellTypeCluster.select.optionSelected' })
    // Close the  menu.
    dispatch({ type: 'cellTypeCluster.menu.optionSelected' })
    
    cellTypeChangeConclusion(cellTypes, dispatch, focusLabelIndex)
}

const makeUnique = (labels, labelBase) => {
    let unique = false
    let label
    while (unique === false) {
        label = labelBase + seq++
        if (!labels.includes(label)) {
            unique = true
        }
    }
    return label
}

const uniqueLabel = (cellTypes, label, startCol, endCol) => {
    // If there is no label, give it a placeholder label.
    
    // Find all of the labels and remove the ones we're modifying.
    const labels = cellTypes.map(type => {
        return type.label
    })
    labels.splice(startCol, endCol - startCol + 1)
    
    // If there is no label, make a placeholder.
    if (!label) {
        return makeUnique(labels, placeholder)
    }
    // If the label is not unique, make it so.
    if (labels.includes(label)) {
        return makeUnique(labels, label)
    }
    return label
}

const multiColumnType = (startCol, endCol, dispatch) => {
    // "Make Cell Type" was clicked on the menu while there is a selection,
    // so group the selection and return the cell type label.
    
    // Find the unique labels in the new group.
    let cellTypes = dataStore.getCellTypes()
    const groupTypes = cellTypes.filter((type, i) => {
        if (i < startCol || i > endCol) {
            return false
        }
        if (type.label) {
            return true
        }
        return false
    })
    const labels = groupTypes.map(type => {
        return type.label
    })
    const uniqueLabels = [...new Set(labels)]
    
    // Only one label can be saved for the new group.
    let label
    if (uniqueLabels.length < 2) {
        label = uniqueLabel(cellTypes, uniqueLabels[0], startCol, endCol)
    } else {
        dispatch({
            type: 'app.snackbar.open',
            value: {
                message: "There are multiple labels and I don't know which " +
                "to use. Remove all but one label then make the cell type.",
                severity: 'error',
            }
        })
        return
    }
    
    // Set the labels of all of the selected columns to the same label.
    for (let i = startCol; i <= endCol; i++) {
        cellTypes[i] = { label }
    }

    // Finish up.
    cellTypeChangeCleanUp(cellTypes, dispatch, startCol)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAway: ev => {
            dispatch({ type: 'cellTypeCluster.menu.clickAway' })
        },
        onGeneStatsClick: ev => {
            // Get the cluster's gene stats.
            const cluster =
                dataStore.getClusters()[rxGet('cellTypeCluster.menu').startCol]
            getGeneTableData(cluster.name)
            // Close the context menu.
            dispatch({ type: 'cellTypeCluster.menu.optionClicked' })
        },
        onMakeTypeClick: ev => {
            // A new cell type has been requested.
            const { startCol, endCol } = rxGet('cellTypeCluster.menu')
            if (startCol === endCol) {
                // There is a single cluster for this cell type.
                // Give new cell type a label to differentiate it from others.
                const cellTypes = dataStore.getCellTypes()
                const newCellTypes = cellTypes.map((type, i) => {
                    return (i === startCol)
                        ? { label: uniqueLabel(
                                    cellTypes, type.label, startCol, endCol) }
                        : type
                })
                // Finish up.
                cellTypeChangeCleanUp(newCellTypes, dispatch, endCol)
                
            } else { // this is a multi-column cell type
                multiColumnType(startCol, endCol, dispatch)
            }
        },
        onSelectInfoClick: ev => {
            // Give the user info on how to make a multi-column cell type.
            dispatch({
                type: 'app.snackbar.open',
                value: {
                    message:
                    'For a multi-column cell type: ' +
                    '(1) click on begin cluster, ' +
                    '(2) shift-click on end cluster,' +
                    '(3) select "Make Cell Type".',

                    severity: 'fromDirectRequest',
                }
            })
        },
    }
}
/*
*/

const ColorBarMenu = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default ColorBarMenu
export { setMenuOptions }
