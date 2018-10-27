
// The dataset page table logic.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import { set as rxSet } from 'state/rx'
import { stateMatrixMapDispatchToProps, stateMatrixGetData }
    from 'state/stateMatrix.js'

const MINIMAL = false
let firstSort = true // To sort the table before the first display.

// The column IDs for the table.
let colId
if (MINIMAL) {
    colId = [
        'name' ,
        'organ',
        'species',
        'sample count',
    ]
} else {
    colId = [
        'name' ,
        'organ',
        'species',
        'sample count',
        'abnormality',
        'primary data',
        'scanpy object of primary data',
        'sample metadata',
        'primary data normalization status',
        'clustering script',
        'reasonable for trajectory analysis',
        'trajectory analysis script',
        'platform',
        'expression data source',
        'expression data source URL',
    ]
}

// Those column IDs that should be formatted as numeric.
const numericId = ['sample count']

const receiveData = (dataIn) => {

    // Receive the data from the fetch.
    const data = dataIn.map(rowIn => {
        let row = {}
        colId.forEach((id, i) => {
            row[id] = rowIn[i+1]
        })
        return row
    })
    rxSet('dataset.table.load', { data })
}

const createTableRow = (row, state) => {

    // Create the displayable row for a row of data.
    // This is the place to insert any components other than text display.
    return row
}

const getData = (state) => {
    let r = stateMatrixGetData(
        'dataset', state, firstSort, createTableRow, receiveData)

    // Only do the first sort if there is data.
    if (r.data.length > 0) {
        firstSort = false
    }
    return r
}

const getHead = () => {
    return colId.map(id => {
         if (numericId.includes(id)) {
             return { id: id, numeric: true }
         }
         return {id: id}
    })
}

const mapStateToProps = (state) => {
    return {
        table: getData(state),
        head: getHead(),
        expand: state['dataset.expand'],
        classes: { row: 'row' },
    }
}

const updateOrderBy = (property, prev) => {
    console.log('property, prev:', property, prev)
    // Update the order given the new column and previous order.
    let next = { property, direction: 'asc' }

    // If the column is the same, toggle direction.
    if (prev && prev.property === property && prev.direction === 'asc') {
        next.direction = 'desc'
    }
    return next
}

const mapDispatchToProps = (dispatch) => {
    return stateMatrixMapDispatchToProps('dataset', dispatch, updateOrderBy)
}

const DatasetTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default DatasetTable
