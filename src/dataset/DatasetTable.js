
// The dataset page table logic.

import { connect } from 'react-redux'
import Matrix from 'components/Matrix'
import { set as rxSet } from 'app/rx'
import { stateMatrixMapDispatchToProps, stateMatrixGetData }
    from 'state/stateMatrix.js'

const MINIMAL = true
let firstRender = true // To sort the table before the first display.

const createTableRow = ({organ, species, name, sampleCount}, state) => {

    // Create the displayable row for a row of data.
    // This is the place to insert any components other than text input.
    return {organ, species, name, sampleCount}
}

const receiveData = (dataIn) => {

    // Receive the data from the fetch.
    const data = dataIn.map(row => {
        return {
            id: row[0],
            name: row[1],
            organ: row[2],
            species: row[3],
            sampleCount: row[4],
        }
    })

    rxSet('dataset.table.load', { data })
}

const getData = (state) => {
    return stateMatrixGetData('dataset', state, firstRender, createTableRow, receiveData)
}

const getHead = () => {
    if (MINIMAL) {
        return [
            { id: 'name', width: '35%' },
            { id: 'organ', width: '30%'  },
            { id: 'species', width: '20%'  },
            { id: 'sampleCount', width: '15%' , numeric: true },
        ]
    } else {
         return [
            { id: 'name' },
            { id: 'organ' },
            { id: 'species' },
            { id: 'sampleCount', numeric: true },
            { id: 'platform' },
            { id: 'primary data' },
            { id: 'scanpy object' },
            { id: 'sample metadata' },
            { id: 'clustering script' },
            { id: 'reasonable for trajectory analysis' },
            { id: 'trajectory analysis script' },
            { id: 'expression data source' },
            { id: 'expression data source URL' },
        ]
    }
}

const mapStateToProps = (state) => {
    return {
        table: getData(state),
        head: getHead(),
        expand: state['dataset.expand'],
        width: '100%',
        classes: { row: 'row' },
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
    return stateMatrixMapDispatchToProps('dataset', dispatch, updateOrderBy)
}

const DatasetTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default DatasetTable
