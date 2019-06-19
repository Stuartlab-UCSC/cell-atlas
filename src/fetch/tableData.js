
// A fetcher that fetches from the data server for rendering in a dataTable
// components. It transforms the data into the form expected by the dataTable.
// Note: this depends on strict naming conventions for redux state.

import { set as rxSet } from 'state/rx'
import fetchData from 'fetch/data'

// These columns will not have filters, no matter the table.
const noFilters = [
    'analyst_favorite',
    'cellCount',
    'data_source_url',
    'description',
    'expression_hash',
    'id',
    'label',
    'likes',
    'name',
    'method_url',
    'method_parameters',
    'publication_url',
    'scores',
    'uuid',
    'value',
]

const addColumnOptions = (names) => {
    // Add column options given a list of column names.
    // @param names: list of column names
    // @return an array of objects, one object per column
    const cols = names.map(name => {
        let col = { name }
        if (noFilters.includes(name)) {
            col.options = { filter: false}
        }
        return col
    })
    return cols
}

const receiveTableData = (id, dataIn, callback) => {
    // Receive the tabledata from the fetch & put it into state variables.
    // Errors in the fetch have already been handled by the general receive data
    // function that calls this.
    // @param id: ID of the table instance, used as part of the state name
    // @param dataIn: data received from the server; a text value containing TSV
    // @param callback: function to call after receiving the data; optional

    // Parse the rows, building an array of arrays.
    // First build the column information array.
    let columns = []
    let data = []
    const rows = dataIn.split('\n')
    columns = addColumnOptions(rows[0].split('\t'))
    
    // Find the data arrays.
    data = rows.slice(1).map(row => row.split('\t'))
    
   // Replace any values of 'None' with ''.
    const cleanData = data.map((row, i) => {
        return row.map((col, j) => {
            return (col === 'None') ? '' : data[i][j].slice(0)
        })
    })

    // Load the data into the state used to render the table.
    if (callback) {
        callback(columns, cleanData)
    } else {
        rxSet(id + '.tableColumn.load', { value: columns })
        rxSet(id + '.tableData.load', { data: cleanData })
    }
    
    // Indicate the first table has displayed so some UI elements will now
    // be visible.
    rxSet(id + '.firstTableDisplayed.set')
}

const fetchTableData = (id, urlPath, callback) => {
    // Fetch the table data from the server.
    // Get the table data for a matrix instance.
    // @param id: ID of the table instance, used as part of the state name
    // @param urlPath: url path to use in the http request
    // @param callback: function to call after receiving the data
    fetchData(id, urlPath, callback, true, true)
}

export default fetchTableData

export { receiveTableData } // for testing
