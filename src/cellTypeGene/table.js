
import { connect } from 'react-redux'
import React from 'react';

import DataTable from 'components/DataTable'

import { set as rxSet } from 'state/rx'
import { receiveData } from 'fetch/dataTableFetch'

const dataStub =
`gene	log2 fold change vs next	mean expression	support
EGFR	0	0.1333	0.6357	0.44
VEGFA	-1.8606	0.2378	0.74
APOE	-2.4382	-0.234	0.94
IL6	2.7195	-0.3674	0.54`

const getData = () => {
    receiveData('cellTypeWork', dataStub)  // stub
    rxSet('cellTypeGene.firstRender.rendered')
    //fetchData('dataset', encodeURI('/sql/select * from dataset'),
    //    receiveDataFromServer)
}

const Presentation = (props) => {
    const { columns, data, header, showTable } = props
    //console.log('table.Presentation.showTable:', showTable)
    if (!showTable) {
        return (null)
    }
    return (
        <div>
            <DataTable
                header={header}
                data={data}
                columns={columns}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    //console.log('mapStateToProps: state.cellTypeGene.getTable:', state.cellTypeGene.getTable)
    if (state.cellTypeGene.firstRender) {
        getData()
    }
    const tableData = state.cellTypeWork.tableData
    const cluster = state.cellTypeGene.cluster
    return {
        clusters: state.cellTypeWork.clusters,
        columns: state.cellTypeWork.tableColumn,
        data: tableData,
        header: 'Cluster ' + cluster + ': ' + tableData.length + ' matches found',
        showTable: state.cellTypeGene.getTable,
    }
}

const GeneTable = connect(
    mapStateToProps
)(Presentation)

export default GeneTable
