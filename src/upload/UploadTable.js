
// The upload page table of files, logic and state.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import TableButtonGroup from 'components/TableButtonGroup'
import { get as rxGet, set as rxSet } from 'app/rx'
import { tableSortCompare } from 'app/util'
//import { checkFetchStatus, fetchError, parseFetchedJson, tableSortCompare }
//    from 'app/util'

// TODO put in config
//const HUB_URL = 'http://localhost:5000'  // TODO
//const USER = 'swat_soe.ucsc.edu'

const backgrounds = {    // bootstrap message colors
    Complete: '#D8EECE', // green
    Error: '#EDD4D5',    // pink
    Canceled: '#F9F5D9', // yellow
}

const onButtonClick = (ev) => {
    
    // Handle the button click outside of the normal flow because the Matrix
    // component simply passes through cell details as a black box.
    let data = ev.target.closest('button').dataset
    
    // Perform the action on the row.
    rxSet('upload.table.' + data.action, { id: data.id })
}

const createTableRow = ({ id, project, name, size, format, status }) => {

    // Transform the state table data into the presentational component format.
    
    // Define the buttons depending on the status.
    let idStr = id.toString()
    const viewButton = { id: idStr, action: 'view', onClick: onButtonClick, title: 'View this file' }
    let group = []
    if (status === 'Uploading') {
        group.push(viewButton)
        group.push({ id: idStr, action: 'cancel', onClick: onButtonClick, title: 'Cancel upload of this file' })
    } else {
        if (status !== 'Error' && status !== 'Canceled') {
            group.push({ id: idStr, action: 'download', onClick: onButtonClick, title: 'Download this file' })
        }
        group.push(viewButton)
        group.push({ id: idStr, action: 'delete', onClick: onButtonClick, title: 'Permanently remove this file' })
    }
    
    // Group all of the action buttons.
    let action = TableButtonGroup({ group })

    // Define the chip based on the status.
    let chip = null
    if (status === 'Error' || status === 'Canceled') {
        chip = {
            column: 4,
            color: backgrounds[status]
        }
    } else if (status === 'Uploading') {
        chip = {
            column: 4,
        }
    } else {
        chip = {
            column: 4,
            color: backgrounds.Complete
        }
    }

    return { id, project, name, size, format, status, action, chip }
}

/*
const fetchData = (state) => {

    // Fetch the table data from the server.
    let tableRows
    
    const loadData = (data) => {
    
        // Load the received data.
        tableRows = data.id.forEach((id, i) => {
            return createTableRow({
                id,
                name: data.names[i],
                size: data.sizes[i],
                format: data.formats[i],
                status: data.statuses[i]
            })
        })
    }

    // Request the data from the server.
    const url = HUB_URL + '/groupUploads/groupId/' + USER
    fetch(url)
        .then(checkFetchStatus)
        .then(parseFetchedJson)
        .then(loadData)
        .catch(fetchError)
}
*/

const getData = (state) => {

    // Get the table data and order.
    const table = state['upload.table']
    let data = table.data.map(stateRow => {
        return createTableRow(stateRow)
    })
    if (!data) {
        data = [] // TODO
        //data = fetchData(state)
    }
    
    return { data, order: table.order }
}

const getHead = () => {
    const head = [
        { id: 'project', numeric: false, label: 'Project' },
        { id: 'name'   , numeric: false, label: 'Name' },
        { id: 'format' , numeric: false, label: 'Format' },
        { id: 'size'   , numeric: true , label: 'Size' },
        { id: 'status' , numeric: false, label: 'Date' },
        { id: 'action' , numeric: true , label: '' },
    ]
    return head
}

const mapStateToProps = (state) => {
    return {
        table: getData(state),
        head: getHead(state),
        width: '100%',
        classes: { row: 'row' },
    }
}

const updateOrderBy = (property, prev) => {

    // Update the order given the new column and previous order.
    let next = { property, direction: 'desc' }
    
    // If the column is the same, toggle direction.
    if (prev && prev.property === property && prev.direction === 'desc') {
        next.direction = 'asc'
    }
    return next
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestSort: (ev) => {
        
            // Get the current data and sort order.
            let table = rxGet('upload.table')
            let data = table.data.slice()

            let order =
                updateOrderBy(ev.target.closest('th').dataset.id, table.order)

            // Sort and save the sorted data to state.
            data.sort(tableSortCompare(order.property, order.direction))
            dispatch({ type: 'upload.table.sorted', data, order })
        },
    }
}

const UploadTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default UploadTable
