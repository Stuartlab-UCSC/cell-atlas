
// The upload page table of files, logic and state.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import TableButtonGroup from 'components/TableButtonGroup'
import { set as rxSet } from 'state/rx'
import { helperMapDispatchToProps, helperGetData } from 'state/matrixHelper.js'

const backgrounds = {    // bootstrap message colors
    Complete: '#D8EECE', // green
    Error: '#EDD4D5',    // pink
    Canceled: '#F9F5D9', // yellow
}

// The column IDs for the data.
const dataColId = [
    'project',
    'name',
    'format',
    'size',
    'date',
]

const onButtonClick = (ev) => {
    
    // Handle the button click outside of the normal flow because the Matrix
    // component simply passes through cell details as a black box.
    let data = ev.target.closest('button').dataset
    
    // Perform the action on the row.
    rxSet('upload.table.' + data.action, { id: data.id })
}

const createRowButtons = ({ id, project, name, size, format, status }) => {

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
    return TableButtonGroup({ group })
}

const createRowChip = ({ id, project, name, size, format, status }) => {

    // Define the chip based on the status.
    let chip = { column: 4 }
    if (status === 'Error' || status === 'Canceled') {
        chip.color = backgrounds[status]
    } else if (status !== 'Uploading') {
        chip.color = backgrounds.Complete
    }
    return chip
}

const createTableRow = ({ id, project, name, size, format, status }) => {

    // Transform the state table data into the presentational component format.
    let action = createRowButtons({ id, project, name, size, format, status })
    let chip = createRowChip({ id, project, name, size, format, status })

    return { id, project, name, size, format, status, action, chip }
}

const receiveData = (dataIn) => {
    // TODO
}

const getHead = () => {
    const head = [
        { id: 'project', numeric: false, label: 'Project' },
        { id: 'name'   , numeric: false, label: 'Name' },
        { id: 'format' , numeric: false, label: 'Format' },
        { id: 'size'   , numeric: true , label: 'Size' },
        { id: 'status' , numeric: false, label: 'Date' },
        { id: 'action' , numeric: true , label: ' ' },
    ]
    return head
}

const mapStateToProps = (state) => {
    return {
        table: helperGetData('upload', state, createTableRow, dataColId),
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
    return helperMapDispatchToProps('upload', dispatch, updateOrderBy)
}

const UploadTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default UploadTable
