
// The dataset page.

import React from 'react'
import { connect } from 'react-redux'

import DataTable from 'components/DataTable'
import fetchData from 'fetch/dataTableFetch'
import { integerToCommaInteger } from 'app/util'

let data = []
let columns = []

const receiveDataFromServer = (columnsIn, dataIn) => {
    // Handle the data received from the server.
    columns = columnsIn
    data = dataIn  // save to our data area
}

const getData = (download) => {
    fetchData('dataset', encodeURI('/sql/select * from dataset'),
        receiveDataFromServer)
}

const tableStyle = {
    marginTop: '-0.9rem',
    marginLeft: '-1.5rem',
    marginRight: '-1.5rem',
    marginBottom: '3rem',
}

const DatasetPres = ({ title, header, columns, data, message }) => {
    return (
        <div style={tableStyle}>
            <DataTable
                title={title}
                header={header}
                columns={columns}
                data={data}
                message={message}
            />
        </div>
    )
}

const cellCount = (rows) => {
    const countCol = 5
    if (rows.length > 0) {
        let accum = rows.reduce((accum, row) => {
            if (row[countCol].length > 0) {
                accum += parseInt(row[countCol], 10)
            }
            return accum
        }, 0)
        return integerToCommaInteger(accum)
    } else {
        return null
    }
}

const mapStateToProps = (state) => {
    if (data.length < 1) {
        getData()
    }
    return {
        title: 'Datasets',
        header: cellCount(data) + ' Cells in ' + data.length + ' Datasets',
        message: state.dataset.fetchMessage,
        columns,
        data,
        status: state.dataset.fetchStatus,
    }
}

const Dataset = connect(
    mapStateToProps
)(DatasetPres)

export default Dataset
