
// The upload page table of files, logic and state.

import React from 'react'
import { connect } from 'react-redux'

import Matrix from 'components/Matrix'
import SmallButton from 'components/SmallButton'

const backgrounds = {    // bootstrap message colors
    Complete: '#D8EECE', // green
    Error: '#EDD4D5',    // pink
    Canceled: '#F9F5D9', // yellow
}

const onButtonClick = (ev) => {
    
    // Handle the button click outside of the normal flow because the Matrix
    // component simply passes through cell details as received.
    let id = ev.target.closest('.row').dataset.id
    let action = ev.target.closest('button').dataset.action
    console.log('onButtonClick id, action:', id, action)
}

const createButton = (action) => {
    
    // Handle the button outside of the normal flow because the Matrix
    // component simply passes through cell details as received.
    let button =
        <SmallButton
            action={action}
            variant='flat'
            onClick={onButtonClick}
        />
    return button
}

const createData = (format, name, size, status) => {
    
    // Define the buttons depending on the status.
    let download = null
    let remove
    if (status === 'Uploading') {
        remove = createButton('cancel')
    } else {
        remove = createButton('delete')
        if (status !== 'Error' && status !== 'Canceled') {
            download = createButton('Download')
        }
    }
    
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
    
    // Group all of the buttons.
    let action =
        <div
            style={{
                width: '100%',
            }}
        >
            {download}
            {remove}
        </div>


    return {format, name, size, status, action, background}
}

const getData = (state) => {
    const rows = [
        createData('xyPositions'   , 'myClusteringData.tsv', 332.3, 'Uploading'),
        createData('fullSimilarity', 'myBadData.tsv'       , 149.3, 'Error'),
        createData('metadata'      , 'myCanceledUpload.tsv', 201.9, 'Canceled'),
        createData('metadata'      , 'ExampleMetadata.tab' , 446.2, '08/02/2018  00:00:00 PM'),
        createData('featureMatrix' , 'ExampleFeature.tab'  , 964.2, '08/01/2018  00:00:00 PM'),
    ]
    return rows
}

const getHead = (state) => {
    const head = [
        { id: 'name'  , numeric: false, label: 'Name' },
        { id: 'format', numeric: false, label: 'Format' },
        { id: 'size'  , numeric: true , label: 'Size' },
        { id: 'status', numeric: false, label: 'Date' },
        { id: 'action', numeric: true , label: 'Action' },
    ]
    return head
}

const mapStateToProps = (state) => {
    return {
        data: getData(state),
        head: getHead(state),
        order: state['upload.table.order'],
        width: 850,
        classes: { row: 'row' },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestSort: (ev) => {
            dispatch({
                type: 'upload.table.order.property',
                property: ev.target.closest('th').dataset.id,
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
