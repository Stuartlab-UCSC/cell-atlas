
import { connect } from 'react-redux'
import React from 'react';

import { set as rxSet } from 'state/rx'
import DataTable from 'components/DataTable'

import { receiveData } from 'fetch/dataTableFetch'

const dataStub =
`gene	log2 fold change vs next	mean expression	support
EGFR	0	0.133333333	0.6357	0.44
VEGFA	-1.8606153841224686	0.2378	0.74
APOE	-2.438204148958781	-0.234	0.94
IL6	2.7195469197465476	-0.3674	0.54`

const getData = () => {
    receiveData('cellTypeWork', dataStub)  // stub
    rxSet('cellTypeWork.firstRender.rendered')
    //fetchData('dataset', encodeURI('/sql/select * from dataset'),
    //    receiveDataFromServer)
}

const Presentation = ({ columns, data, header, show }) => {
    if (!show) {
        return (null)
    }
    return (
        <DataTable
            header={header}
            data={data}
            columns={columns}
        />
    )
}

const mapStateToProps = (state) => {
    if (state.cellTypeWork.firstRender) {
        getData()
    }
    const tableData = state.cellTypeWork.tableData
    return {
        columns: state.cellTypeWork.tableColumn,
        data: tableData,
        header: tableData.length + ' matches found',
        show: state.cellTypeWork.showSave,
        //message: state.database.fetchMessage,
    }
}

const GeneTable = connect(
    mapStateToProps
)(Presentation)

export default GeneTable
