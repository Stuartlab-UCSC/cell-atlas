
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
    // @param options: the same as that for fetchData().
    let dataOut = data

    // Look for an error already detected.
    if (rxGet(id + '.fetchStatus') === 'quiet') {
        dataOut = null
        // An error has already been set, so skip the rest of processing.

    // Look for a server error not yet recorded by checking for a message
    // in the data object.
    } else if (data !== null && typeof data === 'object' && data.message) {
        serverError(id, data.message)
        dataOut = null

    // Look for a server error recorded in the options.
    } else if (options.serverError) {
        serverError(id, options.serverError)
        dataOut = null

    // If data is empty on a GET, let the user know there is no data.
    } else if ((options.method === 'GET') &&
        (data === null || data === undefined || data.length < 1)) {
        serverError(id, 'No data found')
        dataOut = null

    } else {
        // This is good data as far as we can tell.
        // Clear the fetch message on valid data.
        rxSet(id + '.fetchMessage.clear')
        if (options.tableData) {
        
            // Receiving of dataTables includes formatting for a dataTable.
            receiveTableData(id, data, callback)
            rxSet(id + '.fetchStatus.quiet')
            return

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
            rxSet(id + '.fetchStatus.quiet')
            return
        }
    }
    if (callback) {
        // Use a timeout so we have good debugging available.
        setTimeout(() => {
            callback(dataOut)
        })
    }
    rxSet(id + '.fetchStatus.quiet')
}

const serverError = (id, message) => {
    console.error('server fetch error:', message)
    rxSet(id + '.fetchMessage.set', { value: message })
    rxSet(id + '.fetchStatus.quiet')
}

const clientError = (id, message) => {
    console.error('client error after fetch:', message)
    rxSet(id + '.fetchMessage.set', { value: message })
    rxSet(id + '.fetchStatus.quiet')
}

const findFetchOptions = (options) => {
    let fetchOpts = { method: options.method }
    if (options.uploadFile) {
        fetchOpts.body = options.uploadFile
    } else if (options.payload) {
        fetchOpts.headers = { 'Content-Type': 'application/json' }
        fetchOpts.body = JSON.stringify(options.payload)
    }
    if (options.credentials) {
        fetchOpts.credentials = 'include'
    }
    return fetchOpts
}

const fetchData = (id, urlPath, callback, optionsIn) => {
    // Get data from the data server.
    // @param id: ID of the table instance, used as part of the state name
    // @param urlPath: url path to use in the http request
    // @param callback: optional function to call after receiving the data
    // @param optionsIn: optional with these possible properties:
    //                 method: http method of POST, GET, etc. defaults to GET
    //                 credentials: true: include auth credentials in request
    //                 fullUrl: true: the url needs no prefix to request
    //                 payload: the data payload
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
        
        // Prepend the data server URL to the given url.
        let url = process.env.REACT_APP_DATA_URL + urlPath
        
        // If the full url is supplied use that instead.
        if (options.fullUrl) {
            url = urlPath
        }

        // TODO encode the url when the decode is implemented on the server.
        const encodedUrl = url
        //const encodedUrl = encodeURI(url)
        
        // Default the method to GET for use when receiving the data.
        options.method = options.method || 'GET'
        
        fetch(encodedUrl, findFetchOptions(options))
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
                if (response.status === 401) {
                    serverError(
                        id, 'Unauthenticated, maybe you need to sign in.')
                } else if (response.status === 403) {
                    serverError(
                        id, 'Unauthorized, maybe you need to sign in.')
                } else {
                    options.serverError = response.statusText
                }
                return response.json()
            }
        })
        .then((data) => receiveData(id, data, callback, options))
        .catch((e) => {
            clientError(id, e.toString())
            receiveData(id, null, callback, options)
        })
    }, 0)
}
export default fetchData
export { receiveData } // for testing
