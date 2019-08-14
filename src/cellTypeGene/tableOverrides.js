
// Theme overrides for the dataTable component.
// These are added to the existing overrides in dataTable.

import { onCellClick } from 'cellTypeGene/ctgTable'
import { set as rxSet } from 'state/rx'
import { filterOn } from 'cellTypeGene/ctgFilter'

const customSort = (data, col, dir) => {
    if (col > 1) {
        // Numeric sort.
        if (dir === 'asc') {
            data.sort(((a, b) => { return a.data[col] - b.data[col] }))
        } else {
            data.sort(((a, b) => { return b.data[col] - a.data[col] }))
        }
    } else {
        // Alphabetical sort for the gene name.
        if (dir === 'asc') {
            data.sort(((a, b) => {
                return (a.data[col] < b.data[col]) ? 1 : -1
            }))
        } else {
            data.sort(((a, b) => {
                return (a.data[col] > b.data[col]) ? 1 : -1
            }))
        }
    }
    return data
}

const onFilterChange = (changedColumn, filterArray) => {
    // Called on any filter change, including via reset button and reset chip.
    // @param changedColumn: the column name
    // @param filterArray: gene filter as an array of genes within an array of
    //                     columns
    
    // If the gene filter array is empty, clear the text field in state.
    if (!filterOn(filterArray[2])) {
        rxSet('cellTypeGene.filterText.uiResetPressed')
    }
}

const optionOverrideFx = (options) => {
    options.customSort = customSort
    options.onCellClick = onCellClick
    options.onFilterChange = onFilterChange
    //options.responsive = 'scroll'
    //options.responsive = 'stacked' // default, really only for mobile devices
    options.rowsPerPage = 15
    options.rowsPerPageOptions = []
    options.sortFilterList = false
    return options
}

const themeOverrideFx = (theme) => {
    theme.overrides.MuiTableCell.root.paddingLeft = 3
    theme.overrides.MuiTableCell.root.paddingRight = 3
    theme.overrides.MUIDataTable = {
        responsiveStacked: {
            overflowY: 'hidden'
        },
        responsiveScroll: {
            overflowY: 'hidden'
        }
    }
    return theme
}

export { optionOverrideFx, themeOverrideFx }
