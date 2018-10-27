
// State - Matrix component helpers.
// This depends on strict naming conventions for redux state and data server
// routes.

import { get as rxGet } from 'state/rx'
import { checkFetchStatus, parseFetchedJson, fetchError}
    from 'app/util'

export const stateMatrixGetData = (
    id, state, firstSort, prettifyRow, receiveData) => {

    // Get the table data and order for a matrix instance.
    // @param id: ID of the table instance, used as:
    //            - part of the state name
    //            - the data server route
    // @param firstSort: true when data will be sorted on first render
    // @param prettifyRow: function that will transform data for rendering
    // @param receiveData: function called when data is received from server
    let table = state[id + '.table']
    if (table.data.length < 1) {

        // With no data in state, go fetch it.
        // Retrieve all rows of the datasbase. All is OK for now because
        // there are not very many in our databases.
        const url = process.env.REACT_APP_DATA_URL + '/cell/' + id + '/getAll'
        //console.log('url:', url)
        fetch(url)
            .then(checkFetchStatus)
            .then(parseFetchedJson)
            .then(receiveData)
            .catch((e) => {
                fetchError(e);
            })
        table = state[id + '.table']
    }

    // Transform the data for rendering.
    let data = table.data.map(row => {
        return prettifyRow(row, state)
    })

    // Upon the first render the data needs to be sorted.
    const order = table.order
    if (firstSort) {
        data.sort(sortCompare(order.property, order.direction))
    }

    return { data, order }
}

export const sortCompare = (column, direction) => {

    // Compare for sorting columns in a matrix.x
    return direction === 'desc' ?
        (a, b) => ((b[column] > a[column]) ? 1 : -1) :
        (a, b) => ((b[column] < a[column]) ? 1 : -1)
}

export const stateMatrixMapDispatchToProps = (id, dispatch, updateOrderBy) => {

    // Map dispatch to props for a matrix instance.
    // @param id: ID of the table instance; used as part of the state name
    // @param dispatch: passed thru from the matrix instance logic
    // @param updateOrderBy: function to call when the order parameters change
    return {
        onRequestSort: (ev) => {

            // Get the current data and sort order.
            let table = rxGet(id + '.table')
            let data = table.data

            let order =
                // Grab the column ID from the column header element.
                updateOrderBy(ev.target.closest('th').dataset.id, table.order)

            // Sort and save the sorted data to state.
            data.sort(sortCompare(order.property, order.direction))
            dispatch({ type: id + '.table.sorted', data, order })
        },
    }
}
