
// The result page table of results, logic and state.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import ResultParms from 'result/ResultParms'
import TableButtonGroup from 'components/TableButtonGroup'
import { set } from 'app/rx'

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
    // component simply passes through the cell details as received.
    let id = ev.target.closest('.row').dataset.id
    let action = ev.target.closest('.action').dataset.action
    console.log('onButtonClick id, action:', id, action)
    switch (action) {
        case 'iew':
        case 'download':
        case 'copy':
        case 'cancel':
        case 'delete':
        default:
    }
}

const onParmClick = (ev) => {
    let id = ev.target.closest('.summary').dataset.id
    set('result.parmShow.toggle', {id} )
}

const createData = (name, analysis, parmText, date, result, status, state) => {

    // All results get a view parameters control.
    let parmShow = state['result.parmShow'][name] || false
    let parms = ResultParms(name, parmText, parmShow, growPanelClasses,
        onParmClick )

    // Define the download or view button depending status and the analysis.
    let buttonGroup = []
    if (status === 'Success') {
        const resultAction = resultActionRef[analysis]
        if (resultAction === 'download') {
            buttonGroup.push({ action: 'download', onClick: onButtonClick })
        } else if (resultAction === 'view' && analysis === 'map') {
            buttonGroup.push({ action: 'download', href: 'http://localhost:3333' })
        }
    }

    // All results get a copy button.
    buttonGroup.push({ action: 'copy', link: '/analyze'})

    // Define the remove button depending on the result status.
    if (status === 'Running') {
        buttonGroup.push({ action:'cancel', onClick: onButtonClick })
    } else {
        buttonGroup.push({ action:'delete', onClick: onButtonClick })
    }

    // Group all of the action buttons.
    let actions = TableButtonGroup({ group: buttonGroup })

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
    
    return {name, analysis, parms, date, result, status, actions, background}
}

const getData = (state) => {
    const rows = [
        createData('myMap'            , 'map'       , ['mapName: swat_soe.ucsc.edu', 'layoutFeatures: myClusteringData.tsv'], '08/08/2018', '----'    , 'Running', state),
        createData('myTrajectory'     , 'trajectory', [], '08/03/2018', '----'   , 'Canceled', state),
        createData('anotherTrajectory', 'trajectory', [], '07/08/2018', '01.9 KB', 'Success' , state),
        createData('anotherMap'       , 'map'       , [], '06/02/2018', '----'   , 'Success' , state),
        createData('oneMoreTrajectory', 'trajectory', [], '06/06/2018', '----'   , 'Error'   , state),
    ]
    return rows
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
        data: getData(state),
        head: getHead(state),
        parmShow: state['upload.parmShow'],
        order: state['result.order'],
        width: '100%',
        classes: { row: 'row' },
        growPanelClasses,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestSort: (ev) => {
            dispatch({
                type: 'result.order.column',
                column: ev.target.closest('th').dataset.id,
            })
        },
    }
}

const ResultTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default ResultTable
