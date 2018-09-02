
// The result page table of results, logic and state.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import ResultParms from 'result/ResultParms'
import TableButtonGroup from 'components/TableButtonGroup'
import { get as rxGet, set as rxSet } from 'app/rx'
import { tableSortCompare } from 'app/util'

// Action reference by result type.
const resultActionRef = {
    map: 'view',
    trajectory: 'download',
}

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

const onParmClick = (ev) => {
    let id = ev.target.closest('.summary').dataset.id
    set('result.parmShow.toggle', {id} )
    //let data = ev.target.closest('.summary').dataset
    //console.log('dataset:', data)
    //rxSet('result.parmShow.toggle', { id: parseInt(data.id, 10) } )
}

const createTableRow = ({id, name, analysis, parms, date, result,
    status}, state) => {

    // All results get a view parameters control.
    let idStr = id.toString()
    let parmShow = state['result.parmShow'][id] || false
    let parmObj = ResultParms(idStr, parms, parmShow, growPanelClasses,
        onParmClick)

    // Define the download or view button depending status and the analysis.
    let group = []
    if (status === 'Success') {
        const resultAction = resultActionRef[analysis]
        if (resultAction === 'download') {
            group.push({ id: idStr, action: 'download', onClick: onButtonClick })
        } else if (resultAction === 'view' && analysis === 'map') {
            group.push({ id: idStr, action: 'download', href: 'http://localhost:3333' })
        }
    }

    // All results get a copy button.
    group.push({ id: idStr, action: 'copy', linkTo: 'analyze/' + analysis })
    

    // Define the cancel/delete button depending on the result status.
    if (status === 'Running') {
        group.push({ id: idStr, action:'cancel', onClick: onButtonClick })
    } else {
        group.push({ id: idStr, action:'delete', onClick: onButtonClick })
    }

    // Group all of the action buttons.
    let actions = TableButtonGroup({ group: group })

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
    
    return {id, name, analysis, parmObj, date, result, status, actions, background}
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
    
    return { data, order: table.order }
}

const getHead = (state) => {
    const head = [
        { id: 'name'     , numeric: false, label: 'Name' },
        { id: 'analysis' , numeric: false, label: 'Analysis' },
        { id: 'parms'    , numeric: false, label: '' },
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
        parmShow: state['result.parmShow'],
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
            data.sort(tableSortCompare(order.property, order.direction))
            dispatch({ type: 'result.table.sorted', data, order })
        },
    }
}

const ResultTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default ResultTable
