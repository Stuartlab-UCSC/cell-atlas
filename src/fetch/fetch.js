
// Data fetcher for generic data from data server.
// Note: this depends on strict naming conventions for redux state
// and data server routes.

import { get as rxGet, set as rxSet } from 'state/rx'

const receiveData = (id, data, callback) => {
    // Receive the data from the fetch & put it into global or state variables.
    console.log('typeof data:', typeof data)
    console.log('data:', data)
    if (typeof data === 'object' && data.message) {
        // Handle receiving a message from the server rather than data.
        rxSet(id + '.fetchMessage', { value: data.message })
        
    // If data is empty, let the user know there is no data.
    } else if (data === null || data === undefined || data.length < 1) {
        rxSet(id + '.fetchMessage', { value: 'No data found' })

    } else {
        callback(data)
        rxSet(id + '.fetchMessage.clear')
    }
    rxSet(id + '.fetchStatus.quiet')
}

const fetchData = (id, urlPath, callback) => {
    // Get data from the data server.
    // @param id: ID of the table instance, used as:
    //            - part of the state name
    //            - the data server route
    // @param urlPath: url path to use in the http request
    // @param callback: function to call after receiving the data
    if (rxGet(id + '.fetchStatus') === 'waiting') {
        return  // we don't want to request again
    }
    rxSet(id + '.fetchStatus.waiting')
    
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
        .then((data) => receiveData(id, data, callback))
        .catch((e) => {
            receiveData(id, e.toString())
        })
}
export default fetchData
