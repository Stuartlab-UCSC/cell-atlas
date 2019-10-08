
// Theme overrides for the dataTable component.
// These are added to the existing overrides in dataTable.

import { onCellClick } from 'cellTypeGene/ctgTable'
import dataStore from 'cellTypeGene/ctgDataStore'
import { onChangePage, onColumnSortChange, onFilterChange, onSearchChange }
    from 'cellTypeGene/ctgDisplayRows'
//import { onTableChange } from 'cellTypeGene/ctgDisplayRows'

const optionOverrideFx = (options) => {
    return {
        ...options,
        count: dataStore.getAvailableCount(),
        onCellClick: onCellClick,
        onChangePage: onChangePage,
        onFilterChange: onFilterChange,
        onColumnSortChange: onColumnSortChange,
        onSearchChange: onSearchChange,
        //onTableChange: onTableChange,
        rowsPerPage: 15,
        rowsPerPageOptions: [],
        searchText: dataStore.getSearchText(),
        serverSide: true,
        sortFilterList: false,
    }
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
