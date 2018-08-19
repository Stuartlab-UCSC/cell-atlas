
// The upload page table of files, logic and state.

import React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'

import Matrix from 'components/Matrix'

const onButtonClick = (ev) => {
    
    // Handle the button click outside of the normal flow because the Matrix
    // component handles cells generically and does not know about the contents
    // of the cell.
    let type = 'cancel'
    if (ev.target.closest('.delete')) {
        type = 'delete'
    }
    console.log('onButtonClick type:', type)
}

const createButton = (type) => {
    let button =
        <Button
            className={type}
            variant='flat'
            color='primary'
            size='small'
            component='span'
            onClick={onButtonClick}
        >
        {type}
        </Button>
    return button
}

const createData = (format, name, size, date) => {
    
    // Define the button as 'delete' or 'cancel' depending on the type
    // of value of the date. Progress bars get a 'cancel button.
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
