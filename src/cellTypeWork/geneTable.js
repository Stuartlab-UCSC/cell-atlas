
import { connect } from 'react-redux'

import { set as rxSet } from 'state/rx'
import { receiveData } from 'fetch/dataTableFetch'
import Presentation from 'cellTypeWork/geneTablePres'

const dataStub =
`gene	log2 fold change vs next	mean expression	support
EGFR	0	0.1333	0.6357	0.44
VEGFA	-1.8606	0.2378	0.74
APOE	-2.4382	-0.234	0.94
IL6	2.7195	-0.3674	0.54`

const getData = () => {
    receiveData('cellTypeWork', dataStub)  // stub
    rxSet('cellTypeWork.firstRender.rendered')
    //fetchData('dataset', encodeURI('/sql/select * from dataset'),
    //    receiveDataFromServer)
}

const mapStateToProps = (state) => {
    if (state.cellTypeWork.firstRender) {
        getData()
    }
    const tableData = state.cellTypeWork.tableData
    return {
        cluster: state.cellTypeWork.geneCluster,
        columns: state.cellTypeWork.tableColumn,
        data: tableData,
        header: tableData.length + ' matches found',
        show: state.cellTypeWork.showSave,
        showTable: state.cellTypeWork.getGeneTable,
        //message: state.database.fetchMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClusterChange: ev => {
            dispatch({ type: 'cellTypeWork.geneCluster.uiSet' })
        },
        onClusterKeyPress: ev => {
            if (ev.key === 'Enter') {
                dispatch({ type: 'cellTypeWork.getGeneTable.true' })
            }
        },
    }
}

const GeneTable = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GeneTable
