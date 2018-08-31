
// The upload page table of files, logic and state.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import TableButtonGroup from 'components/TableButtonGroup'
import { set as rxSet } from 'app/rx'
import { checkFetchStatus, parseFetchedJson, fetchError } from 'app/util'

// TODO put in config
const HUB_URL = 'http://localhost:5000'  // TODO
const USER = 'swat_soe.ucsc.edu'

const backgrounds = {    // bootstrap message colors
    Complete: '#D8EECE', // green
    Error: '#EDD4D5',    // pink
    Canceled: '#F9F5D9', // yellow
}

const onButtonClick = (ev) => {
    
    // Handle the button click outside of the normal flow because the Matrix
    // component simply passes through cell details as received.
    let action = ev.target.closest('button').dataset.action
    
    // Save the row's position or clear the save position,
    // depending on the action button pressed.
    let rowData = ev.target.closest('.row').dataset
    if (action === 'cancel') {
    
        // Save the row's position so its position will be
        // restored after any sort on status.
        rxSet('table.order.position', {
            id: 'upload',
            position: rowData.position,
            positionRowId: rowData.id,
        })
    } else {
        
        // Clear any leftover stored row position.
        rxSet('table.order.positionReset', {id: 'upload'})
    }
    
    // Perform the action on the row.
    rxSet('upload.table.' + action, { id: rowData.id })
}

const createTableRow = ({ id, name, size, format, status }) => {
    
    // Define the buttons depending on the status.
    let group = []
    if (status === 'Uploading') {
        group.push({ action: 'cancel', onClick: onButtonClick })
        //remove = createButton('cancel')
    } else {
        //remove = createButton('delete')
        if (status !== 'Error' && status !== 'Canceled') {
            group.push({ action: 'download', onClick: onButtonClick })
            //download = createButton('Download')
        }
        group.push({ action: 'delete', onClick: onButtonClick })
    }
    
    // Group all of the action buttons.
    let action = TableButtonGroup({ group })

    // Define the background based on the status.
    let background = null
    if (status === 'Error' || status === 'Canceled') {
        background = {
            column: 3,
            color: backgrounds[status]
        }
    } else if (status !== 'Uploading') {
        background = {
            column: 3,
            color: backgrounds.Complete
        }
    }

    return { id, name, size, format, status, action, background }
}

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

const getData = (state) => {

    // Populate the table.
    const stateData = state['upload.table']
    let tableRows = []
    for (let id in stateData) {
        tableRows.push(createTableRow(stateData[id]))
    }
    if (tableRows.length < 1) {
        tableRows = fetchData(state)
    }
    return tableRows
}

const getHead = (state) => {
    const head = [
        { id: 'name'  , numeric: false, label: 'Name' },
        { id: 'size'  , numeric: true , label: 'Size' },
        { id: 'format', numeric: false, label: 'Format' },
        { id: 'status', numeric: false, label: 'Date' },
        { id: 'action', numeric: true , label: '' },
    ]
    return head
}

const mapStateToProps = (state) => {
    return {
        data: getData(state),
        head: getHead(state),
        order: state['table.order'].upload,
        width: 850,
        classes: { row: 'row' },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestSort: (ev) => {
            dispatch({
                type: 'table.order.column',
                id: 'upload',
                column: ev.target.closest('th').dataset.id,
            })
        },
    }
}

// Connect the value props and eventHandler props
// to the presentational component.
const UploadTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default UploadTable
