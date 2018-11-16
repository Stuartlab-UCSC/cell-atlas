
// Fetch utilities.

const reportError = json => {

    // Report a fetch error.
    let msg = 'Data server: '
    if (json.error) {
        msg += json.error
    }
    if (json.stackTrace) {
        msg += ': ' + json.stackTrace
    }
    console.error(msg)
    //alert(' Failed to receive data from server.')
}

export const fetchError = e => {
    console.error(e);
}

export const getFetchedJson = response => {

    // This is called when expecting a json response to a fetch request.
    if (response.ok && response.status === 200) {

        // Looks good so return the text of the response.
        return response.json()
    } else {

        // Not good, so return the json of the response which may contain
        // more information than just the standard http error status.
        response.json()
            .then(reportError)
        return null
    }
}
