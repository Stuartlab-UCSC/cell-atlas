
// The fetch for the cell type worksheet gene table.
// Handles paging, sorting, searching and filtering.

// There is one list each to maintain the indices of rows which pass the
// filters and rows which pass the search so that the intersection of these
// contains the indices of the rows to display called the 'available' rows.
// dataStore.display only contains the rows of data for the current page.
//
// The basic method:
// - on page change:
//      1. display the specified page of data in the available list
// - after a filtered or searched list changes:
//      1. populate the available list with the intersection of the
//         searched indices and the filtered indices
//      2. sort the available list
//      3. display starting at page 0
// - on filter change:
//      1. populate the filtered list by one of:
//          - from the full data
//          - capture diffs with prev filtered list then only grab new rows
//            passing the filter from the full data
//      2. do 'after a filtered or searched list changes:
// - on search change:
//      1. populate the searched list from the full data
//      2. do 'after a filtered or searched list changes'
// - on sort change:
//      1. sort the available list
//      2. display starting at page 0

import { set as rxSet } from 'state/rx'
import dataStore from 'cellTypeGene/ctgDataStore'
import { filterOn } from 'cellTypeGene/ctgFilter'
import { DOMAIN } from 'cellTypeGene/ctgMain'

const rowsPerPage = 15
const col = 2  // the index of the gene name column

let useFullData = true

// The various states of the data:
// dataStore.data   // all rows received from the server
let filtered = []   // row indices passing the filter
let searched = []   // row indices passing the search
let available = []  // row indices passing the filter and search
// dataStore.display // rows to be displayed on the current page

let filterEnabled = false
let searchStr = ''
// TODO the sort vars are probably in rx state
let sortDir = null  // the sort direction
//let sortCol = null  // the sort column

const customSort = (data, col, dir) => {
    /*if (col > 1) {
        // TODO do we need this numeric sort?
        // Numeric sort.
        if (dir === 'asc') {
            data.sort(((a, b) => { return a.data[col] - b.data[col] }))
        } else {
            data.sort(((a, b) => { return b.data[col] - a.data[col] }))
        }
    } else {*/
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
    //}
    return data
}

const applySort = () => {
    if (!sortDir) {
        // There is nothing to sort on.
        return
    }
    // TODO
}

const onChangePage = (page) => {
    // This returns the rows from the available rows in the page specified.
    // @param page the new page number
    const begin = page * rowsPerPage
    let display = []
    const data = dataStore.getData()
    if (useFullData) {  // no sorting or filtering happening
        display = data.slice(begin, begin + 15)

    } else { // there is searching or filtering going on
        display = available.map(i => {
            return data[i]
        })
    }
    dataStore.setDisplay(display)
    rxSet('cellTypeGene.fetchStatus.quiet')
    rxSet('cellTypeGene.render.now')

    /*
    TODO The scrolling is not working to scroll down to the gene table.
    setTimeout(() => { window.scrollTo(0, 100) }, 1000)

    window.scroll({
        top: 300,
        left: 0,
        behavior: 'smooth'
    })
    */
}

const findAvailable = () => {
    // Find the available rows that pass the filters and search.
    // This is called for every change of filter or search.
    const data = dataStore.getData()
    
    // Reset the use of full data.
    useFullData = false

    // Find the available indices from the searched and filtered indices.
    if (filterEnabled) {
        if (searched.length > 0) {
            // With both enabled, find the intersection of the two sets.
            available = filtered.forEach(fi => {
                return (data[fi][col].includes(searchStr))
            })
        } else {  // filter is enabled, search is not
            available = filtered
        }
        
    } else {  // filter is not enabled
        if (searched.length > 0) {  // search is enabled, filter is not enabled
            available = searched
        } else {  // neither are enabled
            useFullData = true
            // TODO still need to tell someone to use data as display data.
        }
    }
    
    // Sort the available rows indices by the sort in effect.
    applySort()
    
    // Display the first page of the available rows.
    onChangePage(0)
}

/*
const onSearchChange = () => {
    // TODO
}

const onSortChange = () => {
    // TODO
}
*/

const onFilterChange = (changedColumn, filterArrays) => {
    // Called on any filter change, including via reset button and reset chip.
    // The only filtering supported is by gene name.
    // @param changedColumn: the column name
    // @param filterArray: gene filter as an array of genes within an array of
    //                     columns

    // Pull out the filters just for gene name.
    const filterArray = filterArrays[col]
    const prevFilterEnabled = filterEnabled
    filterEnabled = filterOn(filterArray)

    filtered = []
    if (filterEnabled) {
        // Find all of the row indices passing the filter.
        dataStore.getData().forEach((row, i) => {
            const gene = row[col]
            const passed = filterArray.find(filter => {
                // The filter array has already been converted to upper case,
                // so compare that to the gene name in the data.
                return (filter === gene.toUpperCase())
            })
            // Add the row index to the filtered list.
            if (passed) {
                filtered.push(i)
            }
        })

    } else if (prevFilterEnabled) {
        // The filter reset button was pressed, so clear the text field.
        rxSet('cellTypeGene.filterText.reset')

    } else {
        // The filter is disabled and was previously, so there is nothing to do.
        // Probably the filter reset was clicked while the text field was empty.
        return
    }

    findAvailable()
}

const onTableChange = (action, t) => {
    // @param t: the table state
    //console.log('onTableChange', action, t);
    switch (action) {
    case 'resetFilters':
        // Handled in onFilterChange().
        break
    case 'filterChange':
        break
    case 'changePage':
        // Handled directly.
        break
    default:
        //console.log('info: unhandled mui-datatables event:', action)
    }
}

const newDataReceived = () => {
    useFullData = true
    onChangePage(0)
    rxSet('cellTypeGene.show.now')
}

export { customSort, newDataReceived, onChangePage, onFilterChange,
    onTableChange }
