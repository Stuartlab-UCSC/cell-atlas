
// Data fetcher for generic data from data server.
// Note: this depends on strict naming conventions for redux state.

import { get as rxGet, set as rxSet } from 'state/rx'
import { receiveTableData } from 'fetch/tableData'

const receiveData = (id, data, callback, options) => {
    // Receive the data from the fetch.
    // @param id: ID of the table instance, used as part of the state name
    // @param data: data received from the server; for table data this is a text
    //              value containing TSV, otherwise an object
    // @param callback: function to call after receiving the data; optional for
    //                   table data, otherwise required
    // @param options: the same as that for fetchData()

    // If the data contains a message, set the fetch message to that error.
    if (typeof data === 'object' && data.message) {
        rxSet(id + '.fetchMessage.set', { value: data.message })
        console.error('fetch error:', data.message)
        if (callback) {
            setTimeout(() => {
                callback(null, data.message)
            })
        }

    // If data is empty, let the user know there is no data.
    } else if (data === null || data === undefined || data.length < 1) {
        rxSet(id + '.fetchMessage.set', { value: 'No data found' })

    } else {
        // Process the data.
        if (options.tableData) {
        
            // Receiving of dataTables includes formatting for a dataTable.
            receiveTableData(id, data, callback)
        } else if (options.responseType === 'png') {
        
            // Receiving of a png includes converting it to 'src' for an <img>.
            // Use a timeout for good debugging information.
            setTimeout(() => {
                const file = new FileReader();
                file.onload = (e) => {
                    callback(e.target.result)
                }
                file.readAsDataURL(data);
            })
        } else {
            // If we get here, there must be a callback.
            // Use a timeout so we have good debugging available.
            setTimeout(() => { callback(data) })
        }
        rxSet(id + '.fetchMessage.clear')
    }
    rxSet(id + '.fetchStatus.quiet')
}

const error = (id, message) => {
    console.error('fetch error:', message)
    rxSet(id + '.fetchMessage.set', { value: message })
}

const fetchData = (id, urlPath, callback, optionsIn) => {
    // Get data from the data server.
    // @param id: ID of the table instance, used as part of the state name
    // @param urlPath: url path to use in the http request
    // @param callback: optional function to call after receiving the data
    // @param options: optional with these possible properties:
    //                 fullUrl: true: the url needs no prefix to request
    //                 payload: the POST data payload
    //                 responseType: one of json/text/png; defaults to json
    //                 tableData: true: transform response into dataTable format
    if (rxGet(id + '.fetchStatus') === 'waiting') {
        return  // we don't want to request again
    }
    rxSet(id + '.fetchStatus.waiting')
    rxSet(id + '.fetchMessage.set', { value: 'waiting for data...' })
    
    let options = optionsIn || {}
    
    // Allow the state to be recorded.
    setTimeout(() => {
        let url = process.env.REACT_APP_DATA_URL + urlPath
        if (options.fullUrl) {
            url = urlPath
        }
        let fetchOpts = {}
        if (options.payload) {
            // Any request with a payload is assumed to be a POST request.
            fetchOpts = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(options.payload),
            }
        }

        fetch(url, fetchOpts)
        .then((response) => {
            if (response.ok) {
                switch(options.responseType) {
                case 'text':
                    return response.text()
                case 'png':
                    return response.blob()
                case 'json':
                case null:
                default:
                    return response.json()
                }
            } else {
                error(id, response.statusText)
                return response.json()
            }
        })
        .then((data) => receiveData(id, data, callback, options))
        .catch((e) => {
            error(id, e.toString())
        })
    }, 0)
}
export default fetchData
export { receiveData } // for testing
