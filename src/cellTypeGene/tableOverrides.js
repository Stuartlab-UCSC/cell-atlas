
// Theme overrides for the dataTable component.
// These are added to the existing overrides in dataTable.

import { onCellClick } from 'cellTypeGene/ctgTable'
import dataStore from 'cellTypeGene/ctgDataStore'
import { customSort, onChangePage, onFilterChange, onTableChange }
    from 'cellTypeGene/ctgDisplayRows'

const optionOverrideFx = (options) => {
    options.count = dataStore.getCount()
    options.customSort = customSort
    options.onCellClick = onCellClick
    options.onChangePage = onChangePage
    options.onFilterChange = onFilterChange
    options.onTableChange = onTableChange
    //options.responsive = 'scroll'
    //options.responsive = 'stacked' // default, really only for mobile devices
    options.rowsPerPage = 15
    options.rowsPerPageOptions = []
    options.serverSide = true
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
