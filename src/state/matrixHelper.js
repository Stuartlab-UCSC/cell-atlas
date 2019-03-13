
// State - Matrix component helpers.
// This depends on strict naming conventions for redux state and data server
// routes.

import { get as rxGet, set as rxSet } from 'state/rx'

const receiveData = (id, dataIn, noFilterColumns) => {
    // Receive the data from the fetch.
    // TODO: merge this into handling objects as it was.
    if (dataIn === null || dataIn === undefined) {
        return
    }
    let columns = []
    let data = []
    
    if (typeof dataIn === 'object') {
        let message = 'unknown error'
        if (dataIn.message) {
            // Handle receiving a message from the server rather than data.
            message = dataIn.message
        }
        rxSet(id + '.tableStatus.message', { value: message })
    } else if (dataIn === null || dataIn === undefined || dataIn.length < 1) {
        rxSet(id + '.tableStatus.message', { value: 'no data' })

    } else {
        // Parse the rows, building an array of arrays.
        const rows = dataIn.split('\n')
        columns = buildColumns(rows[0].split('\t'), noFilterColumns)
        data = rows.slice(1).map(row => row.split('\t'))

        // Load the data into the state used to render the table.
        rxSet(id + '.tableColumn.load', { value: columns })
        rxSet(id + '.tableData.load', { data })

        // then set status to indicate the data is ready to render.
        rxSet(id + '.tableStatus.quiet')
    }
}

export const helperGetData = (id, urlPath, noFilterColumns) => {

    // Get the table data for a matrix instance.
    // @param id: ID of the table instance, used as:
    //            - part of the state name
    //            - the data server route
    // @param noFilters: optional list of names to be excluded from filtering
    // @param urlPath: url path to use in the http request

    if (rxGet(id + '.tableStatus') === 'requesting') {
        return  // we don't want to request again
    }
    rxSet(id + '.tableStatus.requesting')
    
    // Retrieve all rows of the query.
    // TODO implement pagination.
    const url = process.env.REACT_APP_DATA_URL + urlPath
    let headers = {}

    fetch(url, { headers })
        .then((response) => {
            if (response.ok) {
                return response.text()
            } else {
                return response.json()
            }
        })
        .then((data) => receiveData(id, data, noFilterColumns))
        .catch((e) => {
            receiveData(id, e.toString())
        })
}

const buildColumns = (names, noFilters) => {
    // Create column options.
    // @param names: list of column names
    // @param noFilters: optional list of names to be excluded from filtering
    // @return an array of objects, one object per column

    const options = {filter: false}
    const cols = names.map(name => {
        let col = {name}
        if (noFilters && noFilters.includes(name)) {
            col.options = options
        }
        return col
    })
    return cols
}

