
// Data fetcher for generic data from data server.
// Note: this depends on strict naming conventions for redux state.

import { get as rxGet, set as rxSet } from 'state/rx'
import { receiveTableData } from 'fetch/tableData'

const receiveData = (id, data, callback, optionsIn) => {
    // Receive the data from the fetch.
    // @param id: ID of the table instance, used as part of the state name
    // @param data: data received from the server; for table data this is a text
    //              value containing TSV, otherwise an object
    // @param callback: function to call after receiving the data; optional for
    //                   table data, otherwise required
    // @param options: the same as that for fetchData().
    let options = optionsIn || {}
    const post = (options.payload)

    // Check for authorization.
    if (data === '403' && callback) {
        callback(null, data)

    // If this is a POST and the data is null, that's fine, we're done.
    // TODO handle other requests that may have a payload, such as PUT.
    } else if (post && data === null && callback) {
        setTimeout(() => { callback(data) })
    
    // If the data contains a message, set the fetch message to that error.
    } else if (data !== null && typeof data === 'object' && data.message) {
        rxSet(id + '.fetchMessage.set', { value: data.message })
        console.error('fetch error:', data.message)
        if (callback) {
            setTimeout(() => {
                callback(null, data.message)
            })
        }

    // If data is empty on a GET, let the user know there is no data.
    } else if (!post &&
        (data === null || data === undefined || data.length < 1)) {
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
        } else if (callback) {
            // Use a timeout so we have good debugging available.
            setTimeout(() => { callback(data) })
        }
        // Clear the fetch message on valid data.
        rxSet(id + '.fetchMessage.clear')
    }
    // Quiet the fetch status, no matter if data is valid or not.
    rxSet(id + '.fetchStatus.quiet')
}

const error = (id, message) => {
    console.error('fetch error:', message)
    rxSet(id + '.fetchMessage.set', { value: message })
    rxSet(id + '.fetchStatus.quiet')
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
        
        // Prepend the data server URL to the given url.
        let url = process.env.REACT_APP_DATA_URL + urlPath
        
        // If the full url is supplied use that instead.
        if (options.fullUrl) {
            url = urlPath
        }

        // TODO encode the url when the decode is implemented on the server.
        const encodedUrl = url
        //const encodedUrl = encodeURI(url)
        let fetchOpts = {}
        if (options.payload) {
            // Any request with a payload is assumed to be a POST request.
            // TODO handle other requests that may have a payload, such as PUT.
            fetchOpts = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(options.payload),
            }
        }

        fetch(encodedUrl, fetchOpts)
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
                if (response.status === 403) {
                    error(id, 'Unauthorized, maybe you need to sign in.')
                } else {
                    error(id, response.statusText)
                }
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
