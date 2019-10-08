
// The fetch for the cell type worksheet gene table.
// Handles paging, sorting, searching and filtering.

// The data received from the server contains all of the gene stats for one
// cluster and is stored in dataStore.data.
// There is one list each to maintain the indices of rows which pass the
// filters (filtered) and rows which pass the search (searched) so that the
// intersection of these contains the indices of the rows that are available for
// display (available). dataStore.display only contains the rows of data for the
// current page.
//
// The basic method:
// - on new data received from server:
//      1. reset filtered and searched lists, retaining the sort column
//      2. create the available list from the existing data
//      3. go to step 5
// - on filter or search change:
//      1. re-populate the filtered or searched list with those rows passing
//      2. create the available list by combining the filtered & searched lists
//      3. sort the available list and display starting at page 0
//      4. go to step 5
// - on sort change:
//      4. sort the available list
//      5. display starting at page 0

import { get as rxGet, set as rxSet } from 'state/rx'
import dataStore from 'cellTypeGene/ctgDataStore'
import ctgFilter from 'cellTypeGene/ctgFilter'

const rowsPerPage = 15
const col = 2  // the index of the gene name column

// The various states of the data:
// dataStore.data   // all rows received from the server
let filtered = []   // row indices passing the filter
let searched = []   // row indices passing the search
let available = []  // row indices passing the filter and search
let data // full data from dataStore upon new data received from server

let filterEnabled = false
let searchEnabled = false
let sortDir = null // the sort direction
let sortCol = null // the sort column index

const onChangePage = (page) => {
    // This returns the rows from the available rows in the page specified.
    // @param page the new page number
    const begin = page * rowsPerPage
    const display = available.slice(begin, begin + 15).map(i => {
        return data[i]
    })
    
    dataStore.setDisplay(display)
    rxSet('cellTypeGene.fetchStatus.quiet')
    // TODO do we need both of these ?
    rxSet('cellTypeGene.show.now')
    rxSet('cellTypeGene.render.now')
}

const sortAvailable = () => {
    // Sort the available rows using the sort direction and sort column.
    if (sortCol > col) { //numeric sort
        if (sortDir === 'asc') {
            available.sort(((a, b) => {
                return data[a][sortCol] - data[b][sortCol]
            }))
        } else {
            available.sort(((a, b) => {
                return data[b][sortCol] - data[a][sortCol]
            }))
        }
    } else { // character sort
        if (sortDir === 'asc') {
            available.sort(((a, b) => {
                return (data[a][sortCol] > data[b][sortCol]) ? 1 : -1
            }))
        } else {
            available.sort(((a, b) => {
                return (data[a][sortCol] < data[b][sortCol]) ? 1 : -1
            }))
        }
    }
}

const onColumnSortChange = (columnName, dir) => {
    // @param columnName: the column name
    // @param dir: the direction, one of descending or ascending
    // Find the column index.

    // Save the previous sort column index.
    const prevCol = sortCol
    sortDir = (dir === 'ascending') ? 'asc' : 'desc'

    // Look for the column index for the variable name given.
    sortCol = col // start with the gene column
    if (columnName !== 'gene') {
        const varList = rxGet('cellTypeGene.variableList')
        varList.forEach((variable, i) => {
            if (variable.name === columnName) {
                sortCol = i + 3 // 1 each for scatterplot, add, & gene name
            }
        })
    }
    
    // Update the column sort options.
    if (prevCol !== sortCol) {
        dataStore.updateColumnOption(prevCol, 'sortDirection', undefined)
    }
    dataStore.updateColumnOption(sortCol, 'sortDirection', sortDir)

    // Sort the available rows indices by the new sort.
    sortAvailable()
    
    // Display the first page of the available rows.
    onChangePage(0)
}

const findAvailable = () => {
    // Find the available rows that pass the filters and search. These will be
    // the row indices of full data rows available for display during paging.
    // This is called for every change of filter or search or new data received.
    
    // Find the available indices from the searched and filtered indices.
    available = []
    if (filterEnabled) {
        if (searchEnabled) {
            // Both are enabled
            if (filtered.length > 0 && searched.length > 0) {
                // Both have rows that passed,
                // so find the intersection of the two sets.
                available = filtered.filter(fi => {
                    return (searched.includes(fi))
                })
            }
            
        } else {  // filter is enabled, search is not
            available = filtered
        }
        
    } else {  // filter is not enabled
        if (searchEnabled) {  // search is enabled, filter is not enabled
            available = searched
        } else {  // neither are enabled
            // Include all row indices in the available data.
            available = [...data.keys()]
        }
    }
    
    // Update the count of rows available for display.
    dataStore.setAvailableCount(available.length)

    // Sort the available rows indices by the sort in effect.
    sortAvailable()
    
    // Display the first page of the available rows.
    onChangePage(0)
}

const onSearchChange = (text) => {
    searched = []
    if (text) {
        searchEnabled = true
        dataStore.setSearchText(text)
        const searchText = text.toUpperCase()

        // Find all of the row indices matching the search.
        data.forEach((row, i) => {
            if (row[col].toUpperCase().indexOf(searchText) > -1) {
                searched.push(i)
            }
        })
    } else {
        // The search reset button was pressed, so clear the text field.
        searchEnabled = false
        dataStore.setSearchText('')
    }
    
    findAvailable()
}

const onFilterChange = (changedColumn, filterArrays) => {
    // Called on any filter change, including via reset button and reset chip.
    // The only filtering supported is by gene name.
    // @param changedColumn: the column name
    // @param filterArray: filters as an array of arrays, one for each column

    // Pull out the filters just for gene name.
    // We only use the first element of the geneName filterArray.
    // The gene name filter array[0] will be undefined on a chip X click.
    let filterText = filterArrays[col][0] || ''
    const prevFilterEnabled = filterEnabled
    filterEnabled = (filterText.length > 0)

    filtered = []
    if (filterEnabled) {
        // Find all of the row indices passing the filter.
        data.forEach((row, i) => {
            if (filterText.indexOf(row[col]) > -1) {
                filtered.push(i)
            }
        })

    } else if (prevFilterEnabled) { // filter is newly disabled
        // The filter reset button was pressed, so clear the text field.
        rxSet('cellTypeGene.filterText.reset')

    } else {
        // The filter is disabled now and previously, so there is nothing to
        // do. Probably the filter reset was clicked while the text field
        // was empty.
        return
    }

    // Update the filterText in the gene name column options.
    dataStore.updateColumnOption(col, 'filterList', filterText)
    
    findAvailable()
}
/*
const onTableChange = (action, t) => {
    // Just for debugging.
    // @param t: the table state
    console.log('onTableChange', action, t);
    switch (action) {
    case 'resetFilters': // handled in onFilterChange
    case 'filterChange': // handled in onFilterChange
    case 'changePage':   // handled in onChangePage
    case 'search':       // handled in onSearchChange
    case 'sort':         // handled in onColumnSortChange
        break
    default:
        console.log('info: unhandled mui-datatables event:', action)
    }
}
*/
const newDataReceived = () => {
    // Reset the tracking variables.
    // TODO do we want to carry search or filter over to newly-received data?
    searched = []
    searchEnabled = false
    filtered = []
    filterEnabled = false
    
    // Point to the dataStore data.
    data = dataStore.getData()
    
    // Initialize filtering by gene name.
    rxSet('cellTypeGene.filterText.init')
    dataStore.setColumnOptions(col, ctgFilter())
    
    // Update the sort column option.
    if (sortDir === null) {
        sortDir = 'desc'
        sortCol = col + 1
    }
    dataStore.updateColumnOption(sortCol, 'sortDirection', sortDir)

    // Show the table.
    findAvailable()
    if (rxGet('cellTypeGene.firstTableDisplayed')) {
        document.getElementById('ctgTableScroller').scrollIntoView({
            behavior: 'smooth',
        })
    } else {
        rxSet('cellTypeGene.firstTableDisplayed.set')
    }
}

export { newDataReceived, onChangePage, onColumnSortChange,
    onFilterChange, onSearchChange, /*onTableChange*/ }
