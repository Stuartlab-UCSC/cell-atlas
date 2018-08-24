

// The upload page table of files, logic and state.

import React from 'react'
import { connect } from 'react-redux'

import SmallButton from 'components/SmallButton'

import Matrix from 'components/Matrix'

const resultActionRef = {
    createMap: 'view',
    trajectory: 'download',
}

const onButtonClick = (ev) => {

    // Handle the button click outside of the normal flow because the Matrix
    // component simply passes through cell details as received.
    let id = ev.target.closest('.row').dataset.id
    let action = ev.target.closest('.action').dataset.action
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

const createData = (name, analysis, date, result, status) => {

    // All results get a copy button.
    let copy = createButton('copy')

    // Define the remove button depending on the result status.
    // 'Running' status gets 'cancel' and others get 'delete'.
    let remove = null
    if (status === 'running') {
        remove = createButton('cancel')
    } else {
        remove = createButton('delete')
    }
    
    // Define the result action button depending status and the analysis.
    let resultAction = null
    if (status === 'success') {
        resultAction = createButton(resultActionRef[analysis])
    }

    // Group all of the buttons.
    let action =
        <div
            style={{
                width: '100%',
            }}
        >
            {resultAction}
            {copy}
            {remove}
        </div>
    
    return {name, analysis, date, result, status, action}
}

const getData = (state) => {
    const rows = [
        createData('myMap'            , 'createMap' , '08/08/2018  04:29:48 PM', '----'    , 'running'),
        createData('myTrajectory'     , 'trajectory', '08/03/2018  07:11:33 AM', '----'    , 'canceled'),
        createData('anotherTrajectory', 'trajectory', '07/08/2018  09:22:55 AM', '101.9 KB', 'success'),
        createData('anotherMap'       , 'createMap' , '06/02/2018  08:33:66 AM', '----'    , 'success'),
        createData('oneMoreTrajectory', 'trajectory', '06/06/2018  10:44:77 AM', '----'    , 'failed'),
    ]
    return rows
}

const getHead = (state) => {
    const head = [
        { id: 'name', numeric: false, label: 'Name' },
        { id: 'analysis', numeric: false, label: 'Analysis' },
        { id: 'date', numeric: false, label: 'Run Date' },
        { id: 'result', numeric: true, label: 'Result' },
        { id: 'status', numeric: false, label: 'Status' },
        { id: 'action', numeric: true, label: 'Action' },
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
