
// Common utilities.

const integerToCommaInteger = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    // Given a string number, return a string number
    // with the precision, p, which defaults to 3.
    p = p || 3
    return parseFloat(x).toPrecision(p)
}

const tsvToArrays = (tsv) => {
    const lines = tsv.split('\n')
    let arrays = []
    lines.forEach(line => {
        const cols = line.split('\t')
        arrays.push(cols)
    })
    // Remove a blank last line.
    console.log('arrays.slice(-1).length):', arrays.slice(-1).length)
    console.log('arrays.slice(-1)):', arrays.slice(-1))
    if (arrays.slice(-1).length < 1) {
        arrays.splice(-1,1)
    }
    return arrays
}

export { integerToCommaInteger, isoToday, stringToPrecision, tsvToArrays }
