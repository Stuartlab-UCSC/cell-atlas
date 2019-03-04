
// State - Matrix component helpers.
// This depends on strict naming conventions for redux state and data server
// routes.

import { get as rxGet, set as rxSet } from 'state/rx'

const updateOrderBy = (columnPosition, prev) => {
    // Update the order given the new column and previous order.
    let next = { columnPosition, direction: 'asc' }
    // If the column is the same, toggle direction.
    if (prev && prev.columnPosition === columnPosition
        && prev.direction === 'asc') {
        next.direction = 'desc'
    }
    return next
}

const getSortCompareFunction = (column, direction) => {
    // Compare for sorting columns in a matrix.
    let r
    if (direction === 'desc') {
        r = (a, b) => (b[column] > a[column]) ? 1 :
            ((b[column] < a[column]) ? -1 : 0)
    } else {
        r = (a, b) => (b[column] > a[column]) ? -1 :
            ((b[column] < a[column]) ? 1 : 0)
    }
    return r
}

const receiveData = (id, dataIn, prettifyRow) => {
    // Receive the data from the fetch.
    // TODO: merge this into handling objects as it was.
    if (dataIn === null || dataIn === undefined) {
        return
    }
    let head = []
    let data
    
    if (typeof dataIn === 'object' && dataIn.message) {
        // Handle receiving a messge from the server rather than data.
        data = dataIn.message
    } else {
        // Parse the rows, building an array of arrays.
        const rows = dataIn.split('\n')
        head = helperGetHead(rows[0].split('\t'))
        const dataArray = rows.slice(1).map(row => row.split('\t'))

        // Transform the data into the form needed to render.
        data = dataArray
        if (prettifyRow) {
            data = dataArray.map(row => {
                return prettifyRow(row)
            })
        }

        // Sort the data according to the order.
        const order = rxGet(id + '.table').order
        data.sort(getSortCompareFunction(order.columnPosition, order.direction))
    }
    // Load the data into the state used to render the table.
    rxSet(id + '.tableHead.load', { value: head })
    rxSet(id + '.table.load', { data: data })

    // then set status to indicate the data is ready to render.
    rxSet(id + '.tableStatus', { value: 'readyToRender' })
}

export const helperGetData = (id, prettifyRow, urlPath, colId, download) => {

    // Get the table data and order for a matrix instance.
    // @param id: ID of the table instance, used as:
    //            - part of the state name
    //            - the data server route
    // @param prettifyRow: function that will transform data for rendering
    //                     optional, in which case supply null
    // @param urlPath: url path to use in the http request
    // @param colId: IDs of the database columns as an array
    //               currently unused

    if (rxGet(id + '.tableStatus') === 'requesting') {
        return  // we don't want to request again
    }
    rxSet(id + '.tableStatus', { value: 'requesting' })
    
    // Retrieve all rows of the query.
    // TODO implement pagination.
    const url = process.env.REACT_APP_DATA_URL + urlPath
    let headers = {}
    if (download) {
        headers = {
            'Content-Type': 'text/plain',
            'Content-Disposition': 'attachment; filename="test.tsv"',
        }
    }

    fetch(url, { headers })
        .then((response) => {
            if (response.ok) {
                return response.text()
            } else {
                return response.json()
            }
        })
        .then((data) => receiveData(id, data, prettifyRow))
        .catch((e) => {
            receiveData(id, e.toString())
        })
}

export const helperGetHead = (columnLabels, numericPositions) => {

    // Format columns for headers to be rendered.
    // @param columnLabels: list of column labels
    // @param numericPositions: list of column positions to be aligned as
    //                          numeric, optional
    // @return an array of objects, one object per column
    return columnLabels.map((label, position) => {
        let info = { label, position }
        if (numericPositions && numericPositions.includes(position)) {
            info.numeric = true
        }
         return info
    })
}

export const helperMapDispatchToProps = (id, dispatch) => {

    // Map dispatch to props for a matrix instance.
    // @param id: ID of the table instance; used as part of the state name
    // @param dispatch: passed thru from the matrix instance logic
    // @param updateOrderBy: function to call when the order parameters change
    //                       optional and defaults to the function in this file
    return {
        onRequestSort: (ev) => {

            // Get the current data and sort order.
            let table = rxGet(id + '.table')
            
            // Update the order to sort by, after grabbing the column ID
            // from the column header element.
            const elData = ev.target.closest('th').dataset
            let order = updateOrderBy(
                Number(elData.column_position), table.order)

            // Sort the table.
            table.data.sort(getSortCompareFunction(
                order.columnPosition, order.direction))
            
            // Save the order and the sorted data to state.
            dispatch({
                type: id + '.table.uiSetOrder',
                order,
                data: table.data,
            })
        },
    }
}
