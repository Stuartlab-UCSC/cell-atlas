
// The dataset page table logic.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import { get as rxGet, set as rxSet } from 'app/rx'
import { tableSortCompare, checkFetchStatus, parseFetchedJson, fetchError}
    from 'app/util'

let firstRender = true // We sort the table before the first display.

const growPanelClasses = {
    icon: 'icon',
    summary: 'summary',
    summaryText: 'summaryText',
}

const createTableRow = ({organ, species, name, sampleCount}, state) => {

    // Create the displayable row for a row of data.
    // This is the place to insert any components other than text input.
    return {organ, species, name, sampleCount}
}

const receiveData = (dataIN) => {

    // Receive the data from the fetch.
    const data = dataIN.map(row => {
        return {
            id: row[0],
            organ: row[1],
            species: row[2],
            name: row[3],
            sampleCount: row[4],
        }
    })

    rxSet('dataset.table.load', { data })
}
const fetchData = (state) => {

    // Retrieve all of the dataset-level metadata. All is OK for now because
    // there are not very many.
    const url = process.env.REACT_APP_DATA_URL + '/cell/dataset/getAll'
    //console.log('url:', url)
    fetch(url)
        .then(checkFetchStatus)
        .then(parseFetchedJson)
        .then(receiveData)
        .catch((e) => {
            fetchError(e);
        })
}

const getData = (state) => {

    // Get the table data and order.
    // TODO this could be extracted as a common helper function for tables.

    let table = state['dataset.table']


    if (table.data.length < 1) {

        // With no data in state, go fetch it.
        fetchData(state)
        table = state['dataset.table']
    }

    let data = table.data.map(row => {
        return createTableRow(row, state)
    })

    // Upon the first render the data needs to be sorted.
    const order = table.order
    if (firstRender) {
        data.sort(tableSortCompare(order.property, order.direction))
        firstRender = false
    }

     return { data, order }
}

const getHead = () => {
    const head = [
        { id: 'organ' },
        { id: 'species' },
        { id: 'name' },
        { id: 'sampleCount', numeric: true },
    ]
    return head
}

const mapStateToProps = (state) => {
    return {
        table: getData(state),
        head: getHead(),
        expand: state['dataset.expand'],
        width: '100%',
        classes: { row: 'row' },
        growPanelClasses,
    }
}

const updateOrderBy = (property, prev) => {

    // Update the order given the new column and previous order.
    let next = { property, direction: 'asc' }

    // If the column is the same, toggle direction.
    if (prev && prev.property === property && prev.direction === 'asc') {
        next.direction = 'desc'
    }
    return next
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestSort: (ev) => {
        
            // Get the current data and sort order.
            let table = rxGet('dataset.table')
            let data = table.data

            let order =
                // Grab the column ID from the column header element.
                updateOrderBy(ev.target.closest('th').dataset.id, table.order)

            // Sort and save the sorted data to state.
            data.sort(tableSortCompare(order.property, order.direction))
            dispatch({ type: 'dataset.table.sorted', data, order })
        },
    }
}

const DatasetTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default DatasetTable
