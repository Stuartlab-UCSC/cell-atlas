
// The gene table component for the cell type worksheet.

import { connect } from 'react-redux'
import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DataTable from 'components/DataTable'
import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/dataTableFetch'
import { getDataForAllClusters } from 'cellTypeGene/allClusters'

const USE_TEST_DATA = true
const testData =
`gene	log2 fold change vs next	support
EGFR	0	0.1333	0.6357
VEGFA	-1.8606	0.2378	0.74
APOE	-2.4382	-0.234	0.94
IL6	2.7195	-0.3674	0.54`

const Presentation = (props) => {
    // Rendering of the gene table.
    const { columns, data, header } = props
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

const onAddClick = (gene, tableMeta) => {
    // Save the gene selected.
    rxSet('cellTypeGene.geneSelected.uiSet', { value: gene })
    // Request the gene values for all clusters.
    getDataForAllClusters(gene)
}

const makeAddButtons = (columns, data) => {
    // Insert a new column for adding the gene to the worksheet.
    // Add a duplicate of the gene to the beginning of each row.
    for (let i = 0; i < data.length; i++) {
        const gene = data[i][0]
        data[i].unshift(gene)
    }
    // Add the column info for the operation to be performed on the value.
    columns.unshift(
        {
            name: "Add",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <IconButton
                        size='small'
                        color='primary'
                        style={{
                            marginTop: -10,
                            marginLeft: -15,
                        }}
                        onClick={event => onAddClick(value, tableMeta)}
                    >
                        <AddIcon />
                    </IconButton>
                )
            }
        }
    )
}

const receiveDataFromServer = (columns, data) => {
    // Add the gene selection buttons.
    makeAddButtons(columns, data)
    // Save the data in our space.
    rxSet('cellTypeGene.tableColumn.load', { value: columns })
    rxSet('cellTypeGene.tableData.load', { value: data })
}

const getGeneTableData = () => {
    // Request the data from the server.
    let url =
        '/user/elie' +
        '/worksheet/worksheetName' +
        '/cluster/' + rxGet('cellTypeGene.cluster')
    if (USE_TEST_DATA) {
        receiveData('cellTypeGene', testData, receiveDataFromServer)
    } else {
        fetchData('cellTypeGene', url, receiveDataFromServer)
    }
}

const mapStateToProps = (state) => {
    const data = state.cellTypeGene.tableData
    const cluster = state.cellTypeGene.cluster
    return {
        columns: state.cellTypeGene.tableColumn,
        data: data,
        header: 'Cluster ' + cluster + ': ' + data.length + ' matches found',
        message: state.cellTypeGene.fetchMessage,
    }
}

const GeneTable = connect(
    mapStateToProps
)(Presentation)

export default GeneTable
export { getGeneTableData }
