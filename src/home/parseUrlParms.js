// Parse the URL search parms.

function getParms () {

    // Retrieve the parameters in the url and parse them into an object.
    var parms = window.location.search.substr(1)
    var result = {}
    var found = false
    try {
        parms.split("&").forEach(function(part) {
            if (part !== "") {
                var item = part.split("="),
                    key = item[0],
                    val = decodeURIComponent(item[1])

                // Do we already have a value for this key?
                if (key in result) {

                    // There is a value for this key already.

                    if (typeof result[key] !== 'object') {

                        // The previous value for this key is a single value
                        // so turn the string into an array of one.
                        result[key] = [result[key]]
                    }
                    // Add to the array.
                    result[key].push(val)

                } else {
                    // A brand new key, so a simple value
                    result[key] = val
                }
                found = true
            }
        })
        if (found) {
            return result
        } else {
            return null
        }
    } catch (e) {
        
        let msg = 'The URL is malformed'
        if (e) {
            msg += ': ' + e
        }
        throw new Error(msg)
    }
}

const parse = () => {
    const parms = getParms()
    return parms
}

export default parse
