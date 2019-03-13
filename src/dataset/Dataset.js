
// The dataset page.

import React from 'react'
import { connect } from 'react-redux'

import DatasetTable from 'dataset/DatasetTable'
import { getData } from 'dataset/DatasetTable'

const pageBodyStyle = {
    marginTop: '-0.75rem',
    marginLeft: '-1.5rem',
    marginRight: '-1.5rem',
    marginBottom: '-0.75rem',
}
const DatasetPres = ({classes}) => {
    return (
        <div style={pageBodyStyle} >
            <DatasetTable/>
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state["dataset.tableData"].length < 1) {
        getData()
    }
    return {}
}

const Dataset = connect(
    mapStateToProps
)(DatasetPres)

export default Dataset
