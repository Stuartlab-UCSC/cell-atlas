
// A dataTable fetcher that fetches from the data server.
// Note: this depends on strict naming conventions for redux state
// and data server routes.

import { get as rxGet, set as rxSet } from 'state/rx'

// These columns will not have filters, no matter the table.
const noFilters = [
    'analyst_favorite',
    'cell_count',
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

const receiveData = (id, dataIn, callback) => {
    // Receive the data from the fetch & put it into global or state variables.
    // If dataIn is an object, it is not the usual data string of TSV,
    // so handle it like a message.
    if (typeof dataIn === 'object') {
        let message = 'unknown error'
        if (dataIn.message) {
            // Handle receiving a message from the server rather than data.
            message = dataIn.message
        }
        rxSet(id + '.fetchMessage.set', { value: message })
        
    // If dataIn is empty, let the user know there is no data.
    } else if (dataIn === null || dataIn === undefined || dataIn.length < 1) {
        rxSet(id + '.fetchMessage.set', { value: 'No data found' })

    } else {
        // Parse the rows, building an array of arrays.
        // First build the column information array.
        rxSet(id + '.fetchMessage.clear')
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
        if (id === 'dataset') {
            callback(columns, cleanData)
        } else {
            rxSet(id + '.tableColumn.load', { value: columns })
            rxSet(id + '.tableData.load', { data: cleanData })
        }

        // Set status to indicate the data is ready to render.
        rxSet(id + '.fetchStatus.quiet')
        
        // Indicate the first table has displayed so some UI elements will now
        // be visible.
        rxSet(id + '.firstTableDisplayed.set')
    }
}

const error = (message) => {
    console.log('fetch error:', message)
}

const fetchData = (id, urlPath, callback) => {

    // Get the table data for a matrix instance.
    // @param id: ID of the table instance, used as part of the state name
    // @param urlPath: url path to use in the http request
    // @param callback: function to call after receiving the data
    if (rxGet(id + '.fetchStatus') === 'waiting') {
        return  // we don't want to request again
    }
    rxSet(id + '.fetchStatus.waiting')
    rxSet(id + '.fetchMessage.set', { value: 'waiting for data...' })
    
    // Retrieve all rows of the query.
    // TODO implement pagination.
    const url = process.env.REACT_APP_DATA_URL + urlPath
    let headers = {}

    fetch(url, { headers })
        .then((response) => {
            if (response.ok) {
                return response.text()
            } else {
                error(response.statusText)
            }
        })
        .then((data) => receiveData(id, data, callback))
        .catch((e) => {
            error(e.toString())
        })
}

export default fetchData

export { receiveData } // for testing
