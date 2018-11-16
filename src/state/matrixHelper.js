
// State - Matrix component helpers.
// This depends on strict naming conventions for redux state and data server
// routes.

import { get as rxGet, set as rxSet } from 'state/rx'
import { getFetchedJson, fetchError } from 'state/fetch'

const sortCompare = (column, direction) => {

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

const receiveData = (id, dataIn, colId) => {

    // Receive the data from the fetch.
    if (dataIn === null) {
        return // the fetch probably failed so just bail
    }
    const data = dataIn.map(rowIn => {
        let row = {}
        colId.forEach((id, i) => {
            row[id] = rowIn[i+1]
        })
        return row
    })
    rxSet(id + '.table.load', { data })
}

export const helperGetData = (id, state, prettifyRow, colId) => {

    // Get the table data and order for a matrix instance.
    // @param id: ID of the table instance, used as:
    //            - part of the state name
    //            - the data server route
    // @param firstSort: true when data will be sorted on first render
    // @param prettifyRow: function that will transform data for rendering
    // @param colId: IDs of the database columns as an array
    let table = state[id + '.table']

    if (table.data.length < 1) {

        // With no data in state, go fetch it.
        // Retrieve all rows of the database. All is OK for now because
        // there are not very many in our databases.
        const url = process.env.REACT_APP_DATA_URL + '/cell/' + id + '/getAll'
        //console.log('url:', url)
        fetch(url)
            .then(getFetchedJson)
            .then((data) => receiveData(id, data, colId))
            .catch((e) => {
                fetchError(e);
            })
        table = state[id + '.table']
    }

    // Transform the data for rendering.
    let data = table.data.map(row => {
        return prettifyRow(row, state)
    })

    // Sort the data according to the order.
    const order = table.order
    data.sort(sortCompare(order.property, order.direction))

    return { data, order }
}

export const helperGetHead = (colId, numericId) => {

    // Get the table header info for a matrix instance.
    // @param colId: list of column IDs
    // @param numeridId: list of column IDs to be aligned as numeric
    return colId.map((id , i) => {
        let info = { id }
        if (numericId.includes(id)) {
            info.numeric = true
        }
         return info
    })
}

export const helperMapDispatchToProps = (id, dispatch, updateOrderBy) => {

    // Map dispatch to props for a matrix instance.
    // @param id: ID of the table instance; used as part of the state name
    // @param dispatch: passed thru from the matrix instance logic
    // @param updateOrderBy: function to call when the order parameters change
    return {
        onRequestSort: (ev) => {

            // Get the current data and sort order.
            let table = rxGet(id + '.table')

            // Update the order after grabbing the column ID
            // from the column header element.
            let order =
                updateOrderBy(ev.target.closest('th').dataset.id, table.order)

            // Save the sorted data to state.
            dispatch({ type: id + '.table.uiSetOrder', order })
        },
    }
}
