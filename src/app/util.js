
// Common utilities.

const integerToCommaInteger = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const captureStackTrace = (error) => {
    // Given an error caught with a catch, return the stack trace as a string.
    let stack = error.stack || ''
    stack = stack.split('\n').map(function (line) { return line.trim(); });
    return stack.splice(stack[0] === 'Error' ? 2 : 1);
}

const cleanName = (dirty) => {
    
    // Make a name out of some string that will be safe for file and directory
    // names and for inclusion in URLs
    // Valid characters:
    //     a-z, A-Z, 0-9, dash (-), dot (.), underscore (_)
    // All other characters are replaced with underscores.
    if (dirty === undefined || dirty === null) { return '_' }
    
    return dirty.replace(/[^A-Za-z0-9_\-.]/g, "_");
}

const isoToday = () => {

    // Get todays date in ISO format such as 2018-08-31.
    let date = new Date()
    let month = date.getMonth() + 1
    month = (month < 10) ? '0' + month : month.toString()
    let day = date.getDate()
    day = (day < 10) ? '0' + day : day.toString()
    return date.getFullYear() + '-' + month + '-' + day
}

const stringToPrecision = (x, p) => {
    // Given a string number, return a number of type string
    // with the precision, p, which defaults to 3.
    p = p || 3
    return parseFloat(x).toPrecision(p)
}

const stringToPrecisionNumber = (x, p) => {
    // Given a string number, return a numeric number
    // with the precision, p, which defaults to 3.
    p = p || 3
    const multiplier = Math.pow(10, p);
    return Math.round( parseFloat(x) * multiplier ) / multiplier;
}

const tsvToArrays = (tsv) => {
    const lines = tsv.split('\n')
    let arrays = []
    lines.forEach(line => {
        const cols = line.split('\t')
        arrays.push(cols)
    })
    // Remove the last line if it is blank or contains a single empty string.
    const lastLine = arrays.slice(-1)
    const lastFirst = lastLine[0]
    if (lastLine.length < 1 ||
        (lastFirst.length === 1 && lastFirst[0] === '')) {
        arrays.splice(-1,1)
    }
    return arrays
}

export { captureStackTrace, cleanName, integerToCommaInteger, isoToday,
    stringToPrecision, stringToPrecisionNumber, tsvToArrays }
