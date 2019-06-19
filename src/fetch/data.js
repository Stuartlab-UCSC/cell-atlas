
// Data fetcher for generic data from data server.
// Note: this depends on strict naming conventions for redux state.

import { get as rxGet, set as rxSet } from 'state/rx'
import { receiveTableData } from 'fetch/tableData'

const receiveData = (id, data, callback, tableData) => {
    // Receive the data from the fetch.
    // @param id: ID of the table instance, used as part of the state name
    // @param data: data received from the server; for table data this is a text
    //              value containing TSV, otherwise an object
    // @param callback: function to call after receiving the data; optional for
    //                   table data, otherwise required
    // @param tableData: true for simple tsv table data as text, optional

    // If the data contains a message, set the fetch message to that error.
    if (typeof data === 'object' && data.message) {
        rxSet(id + '.fetchMessage.set', { value: data.message })
        
    // If data is empty, let the user know there is no data.
    } else if (data === null || data === undefined || data.length < 1) {
        rxSet(id + '.fetchMessage.set', { value: 'No data found' })

    } else {
        if (tableData) {
            receiveTableData(id, data, callback)
        } else {
            // With this not being table data, there must be a callback.
            callback(data)
        }
        rxSet(id + '.fetchMessage.clear')
    }
    rxSet(id + '.fetchStatus.quiet')
}

const error = (id, message) => {
    console.error('fetch error:', message)
    rxSet(id + '.fetchMessage.set', { value: message })
}

const fetchData = (id, urlPath, callback, tableData) => {
    // Get data from the data server.
    // @param id: ID of the table instance, used as part of the state name
    // @param urlPath: url path to use in the http request
    // @param callback: optional function to call after receiving the data
    // @param tableData: true for simple tsv table data in the response
    if (rxGet(id + '.fetchStatus') === 'waiting') {
        return  // we don't want to request again
    }
    rxSet(id + '.fetchStatus.waiting')
    rxSet(id + '.fetchMessage.set', { value: 'waiting for data...' })
    
    // Allow the state to be recorded.
    setTimeout(() => {
        const url = process.env.REACT_APP_DATA_URL + urlPath
        let headers = {}

        fetch(url, { headers })
        .then((response) => {
            if (response.ok) {
                return (tableData) ? response.text() : response.json()
            } else {
                error(id, response.statusText)
            }
        })
        .then((data) => receiveData(id, data, callback, tableData))
        .catch((e) => {
            error(id, e.toString())
        })
    }, 0)
}
export default fetchData
export { receiveData } // for testing
