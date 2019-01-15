
// The database page logic.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import DatabasePres from 'database/DatabasePres'

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
        result: state['database.fetch'].data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onExampleChange: ev => {
            console.log('example value:', ev.target.value)
        },
        onExecuteClick: ev => {
            const url = process.env.REACT_APP_DATA_URL + '/api/query/' +
                rxGet('database.query')
            //console.log('url:', url)
            fetch(url)
                .then((response) => {
                    if (response.ok) { return response.json() }
                    dispatch({ type: 'database.fetch.failed',
                        data: 'Data server unreachable' })
                })
                .then((data) => dispatch(
                    { type: 'database.fetch.received', data }))
                .catch((e) => dispatch(
                    { type: 'database.fetch.failed', data: e.toString() }))
        },
    }
}

const Database = connect(
    mapStateToProps, mapDispatchToProps
)(DatabasePres)

export default Database
