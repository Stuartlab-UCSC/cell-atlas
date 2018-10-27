
// The result page table of results, logic and state.

import { connect } from 'react-redux'
import React from 'react'
import Matrix from 'components/Matrix'
import ResultParms from 'result/ResultParms'
import TableButtonGroup from 'components/TableButtonGroup'
import { get as rxGet, set as rxSet } from 'state/rx'
import { sortCompare } from 'state/stateMatrix'

let firstSort = true // We sort the table before the first display.

const backgrounds = {    // bootstrap message colors
    Success: '#D8EECE',  // green
    Error: '#EDD4D5',    // pink
    Canceled: '#F9F5D9', // yellow
}

const statusColumn = 5  // for coloring based on status

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

    // Define the download or view button depending status and the analysis.
    let group = []
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
    let actions = TableButtonGroup({ group: group })

    // Define the chip based on the status.
    let chip = null
    if (status === 'Error' || status === 'Canceled') {
        chip = {
            column: statusColumn,
            color: backgrounds[status]
        }
    } else if (status === 'Running') {
        chip = {
            column: statusColumn,
        }
    } else {
        chip = {
            column: statusColumn,
            color: backgrounds.Success
        }
    }
    
    return {id, name, analysis, parmObj, date, result, status, actions, chip}
}

const getData = (state) => {

    // Get the table data and order.
    const table = state['result.table']

    let data = table.data.map(stateRow => {
        return createTableRow(stateRow, state)
    })
    if (!data) {
        data = [] // TODO
        //data = fetchData(state)
    }

    // Upon the first render the data needs to be sorted.
    const order = table.order
    if (firstSort) {
        data.sort(sortCompare(order.property, order.direction))
        firstSort = false
    }

    return { data, order }
}

const getHead = (state) => {
    const head = [
        { id: 'name'     , numeric: false, label: 'Name' },
        { id: 'analysis' , numeric: false, label: 'Analysis' },
        { id: 'parmObj'  , numeric: false, label: '' },
        { id: 'date'     , numeric: false, label: 'Date' },
        { id: 'result'   , numeric: true , label: 'Result' },
        { id: 'status'   , numeric: false, label: 'Status' },
        { id: 'actions'  , numeric: true , label: '' },
    ]
    return head
}

const mapStateToProps = (state) => {
    return {
        table: getData(state),
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
    return {
        onRequestSort: (ev) => {
        
            // Get the current data and sort order.
            let table = rxGet('result.table')
            let data = table.data.slice()

            let order =
                updateOrderBy(ev.target.closest('th').dataset.id, table.order)

            // Sort and save the sorted data to state.
            data.sort(sortCompare(order.property, order.direction))
            dispatch({ type: 'result.table.sorted', data, order })
        },
    }
}

const ResultTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default ResultTable
