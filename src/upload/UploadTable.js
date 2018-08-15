
// The upload page table of files, logic and state.

import { connect } from 'react-redux'

import Matrix from 'components/Matrix'

let seq = 0
function createData(format, name, size, date) {
    seq += 1
    return { id: seq, format, name, size, date }
}

const getData = (state) => {
    const rows = [
        createData('Feature', 'myClusteringData.tsv', 149.34, '----'),
        createData('Sparse Similarity', '1clusteringData.tsv', 142.55, '----'),
        createData('Attributes', 'myColoringAttributes.tsv', 201.96,
            '08/08/2018  04:29:48 PM'),
    ]
    return rows
}

const getHead = (state) => {
    const head = [
        { id: 'name', numeric: false, label: 'Name' },
        { id: 'format', numeric: false, label: 'Format' },
        { id: 'size', numeric: true, label: 'Size' },
        { id: 'date', numeric: false, label: 'Date' },
    ]
    return head
}

const mapStateToProps = (state) => {
    return {
        data: getData(state),
        head: getHead(state),
        order: state['upload.table.order'],
        width: '800px',
        classes: { row: 'row' },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestSort: (ev) => {
            dispatch({
                type: 'upload.table.order.property',
                property: ev.target.closest('th').dataset.id,
            })
        },
    }
}

// Connect the value props and eventHandler props
// to the presentational component.
const UploadTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix)

export default UploadTable
