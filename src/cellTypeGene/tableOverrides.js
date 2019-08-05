
// Theme overrides for the dataTable component.
// These are added to the existing overrides in dataTable.

import { onCellClick } from 'cellTypeGene/ctgTable'
import { set as rxSet } from 'state/rx'

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

const onFilterChange = (changedColumn, filterList) => {
    // changedColumn: string, filterList: array
    // TODO this should not be done on every change, but it works for now.
    rxSet('cellTypeGene.filterText.reset')
}

const optionOverrideFx = (options) => {
    options.customSort = customSort
    options.onCellClick = onCellClick
    options.onFilterChange = onFilterChange
    options.sortFilterList = false
    return options
}

const themeOverrideFx = (theme) => {
    theme.overrides.MuiTableCell.root.paddingLeft = 3
    theme.overrides.MuiTableCell.root.paddingRight = 3
    return theme
}

export { optionOverrideFx, themeOverrideFx }
