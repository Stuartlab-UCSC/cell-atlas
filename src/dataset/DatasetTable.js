
// The dataset page table logic.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'

import { helperGetData, helperMapDispatchToProps }
    from 'state/matrixHelper'

const createTableRow = (row) => {

    // Create the displayable row for a row of data.
    // This is the place to insert any components other than text display.
    return row
}

const mapStateToProps = (state) => {
    return {
        table: state['dataset.table'],
        head: state['dataset.tableHead'],
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

export const getData = (download) => {
    helperGetData('dataset', createTableRow,
        encodeURI('/sql/select * from dataset'), null, download)
}

export default DatasetTable
