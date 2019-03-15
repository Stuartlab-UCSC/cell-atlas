
// The database page logic.

import { connect } from 'react-redux'

import DatabasePres from 'database/DatabasePres'
import dataTableFetch from 'fetch/dataTableFetch'
import { get as rxGet } from 'state/rx'

export const getData = (download) => {
    dataTableFetch('database', encodeURI('/sql/' + rxGet('database.query')))
}
const mapStateToProps = (state) => {
    // Handle a change in the favorite selected.
    const tableData = state['database.tableData']
    return {
        downloadUrl: process.env.REACT_APP_DATA_URL +
            encodeURI('/sql/' + state['database.query']),
        query: state['database.query'],
        queryRowCount: state['database.query.rowCount'],
        showSchema: state['database.showSchema'],
        showAddToFavorite: state['database.showAddToFavorite'],
        table: {
            columns: state['database.tableColumn'],
            data: tableData,
            status: state['database.tableStatus'],
        }
    }
}

const addFavoriteWithName = (name, dispatch) => {
    // Add the new favorite and the select it.
    const value = rxGet('database.query')
    dispatch({
        type: 'databaseFavorite.list.uiAdd',
        name,
        value,
    })
    dispatch({
        type: 'databaseFavorite.selected.uiAdd',
        value,
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        onQueryKeyPress: ev => {
            if (ev.key === 'Enter') {
                dispatch({ type:'database.query.rowCount.increment' })
            }
        },
        onQueryChange: ev => {
            dispatch({ type: 'database.query.uiSet', value: ev.target.value })
        },
        onExecuteClick: ev => {
            dispatch({ type: 'database.query.executeClick' })
            dispatch({ type: 'database.table.clear' })
            getData()
            // Minimize the query string and schema to make room for the table.
            dispatch({
                type: 'database.query.rowCount.executeClick',
                queryString: rxGet('database.query'),
            })
            dispatch({ type: 'database.showAddToFavorite.true' })
            dispatch({ type: 'database.showSchema.hide' })
        },
        onSchemaClick: ev => {
            dispatch({ type: 'database.showSchema.toggle' })
        },
        onAddFavoriteClick: ev => {
            // Save the callback to handle the new favorite name
            // and open the namer dialog.
            dispatch({
                type: 'namerDialog.onSubmit.uiSet',
                callback: addFavoriteWithName,
            })
            dispatch({
                type: 'namerDialog.message.uiSet',
                value: 'Name this favorite query',
            })
            dispatch({ type: 'namerDialog.open.true' })
        },
    }
}

const Database = connect(
    mapStateToProps, mapDispatchToProps
)(DatabasePres)

export default Database
