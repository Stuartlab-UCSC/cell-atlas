
// The database page logic.

import { connect } from 'react-redux'
import DatabasePres from 'database/DatabasePres'
import { getData } from 'database/DatabaseTable'
import { get as rxGet } from 'state/rx'

const mapStateToProps = (state) => {
    // Handle a change in the favorite selected.
    return {
        downloadUrl: process.env.REACT_APP_DATA_URL +
            encodeURI('/sql/' + state['database.query']),
        query: state['database.query'],
        queryRowCount: state['database.query.rowCount'],
        tableStatus: state['database.tableStatus'],
        showSchema: state['database.showSchema'],
        showDownload: state['database.showDownload'],
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
            // TODO pagination will require a different method.
            dispatch({ type: 'database.table.clear' })
            dispatch({ type: 'database.showDownload.false' })
            getData()
            dispatch({ type: 'database.showDownload.true' })
            dispatch({ type: 'database.showSchema.hide' })
        },

        onSchemaClick: ev => {
            dispatch({ type: 'database.showSchema.toggle' })
        },
        onDownloadClick: ev => {
            getData(true) // true to download
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
