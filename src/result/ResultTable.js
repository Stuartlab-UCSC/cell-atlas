
// The upload page table of files: logic and state.

import React from 'react'
import { connect } from 'react-redux'

import SmallButton from 'components/SmallButton'

import Matrix from 'components/Matrix'

const resultActionRef = {
    createMap: 'view',
    trajectory: 'download',
}

const backgrounds = {    // bootstrap message colors
    Success: '#D8EECE',  // green
    Error: '#EDD4D5',    // pink
    Canceled: '#F9F5D9', // yellow
}

const statusColumn = 5

const onButtonClick = (ev) => {

    // Handle the button click outside of the normal flow because the Matrix
    // component simply passes through cell details as received.
    let id = ev.target.closest('.row').dataset.id
    let action = ev.target.closest('.action').dataset.action
    console.log('onButtonClick id, action:', id, action)
    switch (action) {
        case 'show':
        case 'download':
        case 'copy':
        case 'cancel':
        case 'delete':
        default:
    }
}

const createButton = (action, onClick, href) => {

    // Handle the button outside of the normal flow because the Matrix
    // component simply passes through cell details as received.
    let button =
        <SmallButton
            action={action}
            href={href}
            variant='flat'
            onClick={onClick}
        />
    return button
}

const createData = (name, analysis, date, result, status) => {

    // All results get a show parameters button.
    const showParms = createButton('show', onButtonClick)

    // All results get a copy button.
    let copy = createButton('copy', null, '/analyze',)

    // Define the remove button depending on the result status.
    let remove = null
    if (status === 'Running') {
        remove = createButton('cancel', onButtonClick)
    } else {
        remove = createButton('delete', onButtonClick)
    }

    // Define the download or view button depending status and the analysis.
    let downloadView = null
    if (status === 'Success') {
        const resultAction = resultActionRef[analysis]
        let href = null
        let onClick = null
        if (resultAction === 'download') {
            onClick = onButtonClick
        } else if (resultAction === 'view' && analysis === 'map') {
            href = 'http://localhost:3333'
        }
        downloadView = createButton(resultAction, onClick, href)
    }

    // Group all of the action buttons.
    let actions =
        <div
            style={{
                width: '100%',
            }}
        >
            {downloadView}
            {copy}
            {remove}
        </div>
    
    // Define the background based on the status.
    let background = null
    if (status === 'Error' || status === 'Canceled') {
        background = {
            column: statusColumn,
            color: backgrounds[status]
        }
    } else if (status !== 'Running') {
        background = {
            column: statusColumn,
            color: backgrounds.Success
        }
    }
    
    return {name, analysis, showParms, date, result, status, actions,
        background}
}

const getData = (state) => {
    const rows = [
        createData('myMap'            , 'map'       , '08/08/2018', '----'    , 'Running'),
        createData('myTrajectory'     , 'trajectory', '08/03/2018', '----'    , 'Canceled'),
        createData('anotherTrajectory', 'trajectory', '07/08/2018', '101.9 KB', 'Success'),
        createData('anotherMap'       , 'map'       , '06/02/2018', '----'    , 'Success'),
        createData('oneMoreTrajectory', 'trajectory', '06/06/2018', '----'    , 'Error'),
    ]
    return rows
}

const getHead = (state) => {
    const head = [
        { id: 'name'     , numeric: false, label: 'Name' },
        { id: 'analysis' , numeric: false, label: 'Analysis' },
        { id: 'date'     , numeric: false, label: 'Date' },
        { id: 'showParms', numeric: false, label: 'Parameters' },
        { id: 'result'   , numeric: true , label: 'Result' },
        { id: 'status'   , numeric: false, label: 'Status' },
        { id: 'actions'  , numeric: true , label: 'Action' },
    ]
    return head
}

const mapStateToProps = (state) => {
    return {
        data: getData(state),
        head: getHead(state),
        order: state['upload.table.order'],
        width: '100%',
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
const ResultTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default ResultTable
