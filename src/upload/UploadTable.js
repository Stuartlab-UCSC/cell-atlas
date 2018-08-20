
// The upload page table of files, logic and state.

import React from 'react'
import { connect } from 'react-redux'

import Matrix from 'components/Matrix'
import SmallButton from 'components/SmallButton'

const onButtonClick = (ev) => {
    
    // Handle the button click outside of the normal flow because the Matrix
    // component simply passes through cell details as received.
    let id = ev.target.closest('.row').dataset.id
    let action = 'cancel'
    if (ev.target.closest('.delete')) {
        action = 'delete'
    }
    console.log('onButtonClick id, action:', id, action)
}

const createButton = (action) => {
    
    // Handle the button outside of the normal flow because the Matrix
    // component simply passes through cell details as received.
    let button =
        <SmallButton
            action={action}
            onClick={onButtonClick}
        />
    return button
}

const createData = (format, name, size, date) => {
    
    // Define the button depending on the type of the date value.
    // Strings get 'delete' and progress bars get 'cancel'.
    let action
    if (date !== '----') {
    //TODO if (typeof date === 'string') {
        action = createButton('delete')
    } else {
        action = createButton('cancel')
    }
    return {format, name, size, date, action}
}

const getData = (state) => {
    const rows = [
        createData('Feature', 'myClusteringData.tsv', 149.34, '----'),
        createData('Sparse Similarity', '1clusteringData.tsv', 142.55, '----'),
        createData('Attributes', 'myColoringAttributes.tsv', 201.96,
            '08/08/2018  04:29:48 PM'),
    ]
    return rows
}

const getHead = (state) => {
    const head = [
        { id: 'name', numeric: false, label: 'Name' },
        { id: 'format', numeric: false, label: 'Format' },
        { id: 'size', numeric: true, label: 'Size' },
        { id: 'date', numeric: false, label: 'Date' },
        { id: 'action', numeric: false, label: 'Action' },
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
