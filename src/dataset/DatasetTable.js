
// The dataset page table logic.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import { helperGetHead, helperGetData, helperMapDispatchToProps }
    from 'state/matrixHelper.js'

const MINIMAL = true

// The column IDs for the table.
let tableColId
if (MINIMAL) {
    tableColId = [
        'name' ,
        'organ',
        'species',
        'sample count',
    ]
} else {
    tableColId = [
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
// The column IDs for the database.
const dataColId = tableColId

// Those column IDs that should be formatted as numeric.
const numericId = ['sample count']

const createTableRow = (row) => {

    // Create the displayable row for a row of data.
    // This is the place to insert any components other than text display.
    return row
}

const mapStateToProps = (state) => {
    return {
        table: helperGetData(
            'dataset', createTableRow, '/api/dataset', dataColId),
        head: helperGetHead(tableColId, numericId),
        //expand: state['dataset.expand'],
        classes: { row: 'row' },
    }
}

const mapDispatchToProps = (dispatch) => {
    return helperMapDispatchToProps('dataset', dispatch)
}

const DatasetTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default DatasetTable
