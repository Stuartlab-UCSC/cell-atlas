
// The database page logic.

import { connect } from 'react-redux'
import DatabasePres from 'database/DatabasePres'
import { getData } from 'database/DatabaseTable'

const exampleList = [
    'example1',
    'example2',
]

const mapStateToProps = (state) => {
    return {
        exampleList: exampleList,
        exampleQuery: 'some example query',
        exampleSelected: 'example2',
        query: state['database.query'],
        queryRowCount: state['database.query.rowCount.increment'],
        showSchema: state ['database.showSchema'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onQueryKeyPress: ev => {
            if (ev.key === 'Enter') {
                dispatch({ type:'database.query.rowCount.increment' })
            }
        },
        onExampleChange: ev => {
            console.log('example value:', ev.target.value)
        },
        onExecuteClick: ev => {
            // Clear the existing results to trigger a new query.
            // TODO pagination will require a different method.
            dispatch({ type: 'database.table.clear' })
            getData()
        },
        onSchemaClick: ev => {
            dispatch({ type: 'database.showSchema.toggle' })
        },
    }
}

const Database = connect(
    mapStateToProps, mapDispatchToProps
)(DatabasePres)

export default Database
