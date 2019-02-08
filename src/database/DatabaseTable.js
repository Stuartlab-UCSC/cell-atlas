
// The database page table logic.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import { get as rxGet } from 'state/rx'
import { helperGetData, helperMapDispatchToProps }
    from 'state/matrixHelper'

const createTableRow = (row, state) => {
    // Create the displayable row for a row of data.
    // This is the place to insert any components other than text display.
    return row
}

const mapStateToProps = (state) => {
    return {
        table: state['database.table'],
        head: state['database.tableHead'],
        classes: { row: 'row' },
    }
}

const mapDispatchToProps = (dispatch) => {
    return helperMapDispatchToProps('database', dispatch)
}

const DatabaseTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export const getData = () => {
    helperGetData('database', createTableRow,
        encodeURI('/api/query/' + rxGet('database.query')))
}

export default DatabaseTable
