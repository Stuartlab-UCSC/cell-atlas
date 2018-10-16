
// The dataset page table logic.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import { get as rxGet } from 'app/rx'
import { tableSortCompare } from 'app/util'

const growPanelClasses = {
    icon: 'icon',
    summary: 'summary',
    summaryText: 'summaryText',
}

const createTableRow = (row, state) => {

    // Create the displayable row for a row of data.
    /*
    let idStr = row.id.toString()
    Object.keys(row).forEach(key => {

        let expand = state['dataset.expand'][idStr][key] || false
        let columnObj =
            <ResultColumn
                id={'dataset.' + key + '.expand'}
                subId={idStr}
                parms={row[key]}
                expand={expand}
            />
    })
    */
    return row
}
    /*
        let parmObj =
            <ResultParms
                id={'result.parm.expand'}
                subId={idStr}
                parms={parms}
                expand={expand}
            />
        */

 const getData = (state) => {

    // Get the table data and order.
    const table = state['dataset.table']

    let data = table.data.map(row => {
        return createTableRow(row, state)
    })
    if (!data) {
        data = [] // TODO
        //data = fetchData(state)
    }
    return { data, order: table.order }
}

const getHead = () => {
    const head = [
        { id: 'organ' },
        { id: 'name' },
        { id: 'primaryData' },
        { id: 'scanpyObject' },
        { id: 'sampleMetadata' },
        { id: 'sampleCount', numeric: true },
    ]
    return head
}

const mapStateToProps = (state) => {
    return {
        table: getData(state),
        head: getHead(),
        expand: state['dataset.expand'],
        width: '100%',
        classes: { row: 'row' },
        growPanelClasses,
    }
}

const updateOrderBy = (property, prev) => {

    // Update the order given the new column and previous order.
    let next = { property, direction: 'asc' }

    // If the column is the same, toggle direction.
    if (prev && prev.property === property && prev.direction === 'asc') {
        next.direction = 'desc'
    }
    return next
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestSort: (ev) => {
        
            // Get the current data and sort order.
            let table = rxGet('dataset.table')
            let data = table.data.slice()

            let order =
                updateOrderBy(ev.target.closest('th').dataset.id, table.order)

            // Sort and save the sorted data to state.
            data.sort(tableSortCompare(order.property, order.direction))
            dispatch({ type: 'dataset.table.sorted', data, order })
        },
    }
}

const DatasetTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default DatasetTable
