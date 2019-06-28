
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
        if (tableData) {
            receiveTableData(id, data, callback)
        } else {
            // With this not being table data, there must be a callback.
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

const imageResponse = (response) => {
    console.log('fetched an image response')
    return null
/*
// from
// https://medium.com/front-end-weekly/fetching-images-with-the-fetch-api-fb8761ed27b2
fetch(request, options).then((response) => {
  response.arrayBuffer().then((buffer) => {
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(buffer);

    document.querySelector('img').src = base64Flag + imageStr;
  });
});

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
};
*/
}

const fetchData = (id, urlPath, callback, optionsIn) => {
    // Get data from the data server.
    // @param id: ID of the table instance, used as part of the state name
    // @param urlPath: url path to use in the http request
    // @param callback: optional function to call after receiving the data
    // @param options: optional with these possible properties:
    //                 fullUrl: true: the url needs no prefix to request
    //                 responseType: one of json/text/image; defaults to json
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
        let headers = {}

        fetch(url, { headers })
        .then((response) => {
            if (response.ok) {
                switch(options.responseType) {
                case 'text':
                    return response.text()
                case 'image':
                    return imageResponse(response)
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
        .then((data) => receiveData(id, data, callback, options.tableData))
        .catch((e) => {
            error(id, e.toString())
        })
    }, 0)
}
export default fetchData
export { receiveData } // for testing
