
// The gene table component for the cell type worksheet.

import { connect } from 'react-redux'
import React from 'react'
import Typography from '@material-ui/core/Typography';
import DataTable from 'components/DataTable'
import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/data'
import { receiveTableData } from 'fetch/tableData'
import { stringToPrecision } from 'app/util'
import dataStore from 'cellTypeGene/dataStore'
import { optionOverrideFx, themeOverrideFx } from 'cellTypeGene/tableOverrides'
import makeAddButtons from 'cellTypeGene/addButton'

const DOMAIN = 'cellTypeGene'
const USE_TEST_DATA = false
const testData = {
    cluster_name: 'cluster-name',
    gene_table:
`gene	log2 fold change vs next	support
EGFR	0	0.1333333	0.6357
VEGFA	-1.8606666	0.2378	0.74
APOE	-2.4382	-0.234	0.94
IL6	2.7195	-0.3674	0.54`
}

const Presentation = (props) => {
    // Rendering of the gene table.
    const { columns, cluster, data, header, message, optionOverrideFx } = props
    let Counts = null
    if (!message) {
        Counts = (
            <Typography style={{fontSize: '1rem'}}>
                {'Cluster ' + cluster + ': ' + data.length + ' matches found'}
            </Typography>
        )
    }
    return (
        <div>
            {Counts}
            <DataTable
                header={header}
                data={data}
                columns={columns}
                message={message}
                optionOverrideFx={optionOverrideFx}
                themeOverrideFx={themeOverrideFx}
            />
        </div>
    )
}

const receiveTableDataFromServer = (columns, data) => {
    // Receive the table column and body data
    // derived from the original data from the server.

    // Shorten the values to 4 significant digits.
    let cleanData =
        data.map(row => {
            return row.map((col, i) => {
                if (i < 1) {
                    return col
                }
                return stringToPrecision(col, 4)
            })
        })

    // Set the initial sort to the most likely column.
    let likely = columns[1]
    if (!likely.options) {
        likely.options = {}
    }
    likely.options.sortDirection = 'desc'
    
    // Tell the dataTable component these are numeric for sorting and display.
    columns.slice(1).forEach(col => {
        if (!col.options) {
            col.options = {}
        }
        col.options.number = true
        col.options.numeric = true
    })
    
    // Build the add buttons for each row.
    makeAddButtons(columns, cleanData)

    // Save the columns and data then render.
    dataStore.load(columns, cleanData)
    rxSet('cellTypeGene.render.now')
}

const receiveDataFromServer = (data) => {
    // Receive the data from the server and call to extract the columns from
    // the data.
    
    // Save the cluster to which this gene data belongs.
    rxSet('cellTypeGene.cluster.set', { value: data.cluster_name })
    
    // Derive the table columns and body data from the server data.
    receiveTableData(DOMAIN, data.gene_table, receiveTableDataFromServer)
}

const getGeneTableData = (urlIn) => {
    // Request the data from the server.
    console.log('getGeneTableData: urlIn:', urlIn)
    // If no url is supplied, get the cluster from state.
    let url = urlIn
    if (url === undefined) {
        url =
            '/user/elie' +
            '/worksheet/worksheetName' +
            '/cluster/' + rxGet('cellTypeGene.cluster')
    }
    if (USE_TEST_DATA) {
        receiveData(DOMAIN, testData, receiveDataFromServer)
    } else {
        fetchData(DOMAIN, url, receiveDataFromServer)
    }
}

const mapStateToProps = (state) => {
    const table = dataStore.get()
    const cluster = state.cellTypeGene.cluster
    return {
        cluster,
        columns: table.columns,
        data: table.data,
        message: state.cellTypeGene.fetchMessage,
        optionOverrideFx: optionOverrideFx,
        render: state.cellTypeGene.render,
    }
}

const GeneTable = connect(
    mapStateToProps
)(Presentation)

export default GeneTable
export { getGeneTableData }
