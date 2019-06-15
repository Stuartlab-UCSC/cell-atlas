
import { connect } from 'react-redux'
import React from 'react'
//import IconButton from '@material-ui/core/IconButton';
//import AddIcon from '@material-ui/icons/Add';
import DataTable from 'components/DataTable'
import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/dataTableFetch'

const USE_TEST_DATA = true
const testData =
`gene	log2 fold change vs next	mean expression	support
EGFR	0	0.1333	0.6357	0.44
VEGFA	-1.8606	0.2378	0.74
APOE	-2.4382	-0.234	0.94
IL6	2.7195	-0.3674	0.54`

const Presentation = (props) => {
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

/*
const onAddClick = (ev) => {
    console.log('onAddClick target:', ev.target)
}
*/
const makeAddButtons = (columns, data, onAddClick) => {
    // Insert a new column at the beginning.
    /*
    columns.splice(0, 0, {name: ''})
    // Make a button for each row in the first column.
    for (let i = 0; i++; i < data.length) {
        const gene = data[0]
        data[i].unshift((
            <IconButton
                size='small'
                color='primary'
                data-gene={gene}
                onClick={onAddClick}
            >
                <AddIcon />
            </IconButton>
        ))
    }
    console.log('data:', data)
    */
}

const receiveDataFromServer = (columns, data) => {
    // Add the gene selection buttons.
    makeAddButtons(columns, data)    
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
