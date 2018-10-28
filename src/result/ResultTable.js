
// The result page table of results, logic and state.

import { connect } from 'react-redux'
import React from 'react'
import Matrix from 'components/Matrix'
import ResultParms from 'result/ResultParms'
import TableButtonGroup from 'components/TableButtonGroup'
import { set as rxSet } from 'state/rx'
import { helperMapDispatchToProps, helperGetData } from 'state/matrixHelper.js'

const statusColumn = 5  // for coloring based on status

const backgrounds = {    // bootstrap message colors
    Success: '#D8EECE',  // green
    Error: '#EDD4D5',    // pink
    Canceled: '#F9F5D9', // yellow
}

// The column IDs for the database.
const dataColId = [
    'name',
    'analysis',
    'date',
    'result',
    'status',
]

const growPanelClasses = {
    icon: 'icon',
    summary: 'summary',
    summaryText: 'summaryText',
}

const onButtonClick = (ev) => {

    // Handle the button click outside of the normal flow because the Matrix
    // component simply passes through cell details as a black box.
    let data = ev.target.closest('button').dataset
    
    // Perform the action on the row.
    rxSet('result.table.' + data.action, { id: parseInt(data.id, 10) })
}

const createRowButtons = ({id, name, analysis, parms, date, result, status},
    idStr) => {

    // Create the buttons for a row.
    let group = []

    // Define the download or view button depending status and the analysis.
    if (status === 'Success') {
        group.push({ id: idStr, action: 'view', href: 'http://localhost:3333', title: 'View the results' })
        group.push({ id: idStr, action: 'download', onClick: onButtonClick, title: 'Download the results' })
    }

    // All results get a copy button.
    group.push({ id: idStr, action: 'copy', linkTo: 'analyze/' + analysis, title: 'Copy the parameters for a new analysis run' })

    // Define the cancel/delete button depending on the result status.
    if (status === 'Running') {
        group.push({ id: idStr, action:'cancel', onClick: onButtonClick, title: 'Cancel this analysis run' })
    } else {
        group.push({ id: idStr, action:'delete', onClick: onButtonClick, title: 'Remove all results of this analysis' })
    }

    // Group all of the action buttons.
    return TableButtonGroup({ group: group })
}

const createRowChip = ({id, name, analysis, parms, date, result, status}) => {

    // Define the chip based on the status.
    let chip = { column: statusColumn }
    if (status === 'Error' || status === 'Canceled') {
        chip.color = backgrounds[status]
    } else if (status !== 'Running') {
        chip.color = backgrounds.Success
    }
    return chip
}

const createTableRow = ({id, name, analysis, parms, date, result, status},
    state) => {

    // Create the displayable row for a row of data.
    let idStr = id.toString()
    let expand = state['result.parm.expand'][id] || false
    
    let parmObj =
        <ResultParms
            id={'result.parm.expand'}
            subId={idStr}
            parms={parms}
            expand={expand}
        />

    let actions = createRowButtons(
        {id, name, analysis, parms, date, result, status}, idStr)
    let chip = createRowChip(
        {id, name, analysis, parms, date, result, status})

    return {id, name, analysis, parmObj, date, result, status, actions, chip}
}

const getHead = (state) => {
    const head = [
        { id: 'name'     , numeric: false, label: 'Name' },
        { id: 'analysis' , numeric: false, label: 'Analysis' },
        { id: 'parmObj'  , numeric: false, label: ' ' },
        { id: 'date'     , numeric: false, label: 'Date' },
        { id: 'result'   , numeric: true , label: 'Result' },
        { id: 'status'   , numeric: false, label: 'Status' },
        { id: 'actions'  , numeric: true , label: ' ' },
    ]
    return head
}

const mapStateToProps = (state) => {
    return {
        table: helperGetData('result', state, createTableRow, dataColId),
        head: getHead(state),
        parmShow: state['result.parm.expand'],
        width: '100%',
        classes: { row: 'row' },
        growPanelClasses,
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
    return helperMapDispatchToProps('result', dispatch, updateOrderBy)
}

const ResultTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default ResultTable
