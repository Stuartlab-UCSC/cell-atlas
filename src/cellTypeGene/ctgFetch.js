
// The fetch for the cell type worksheet gene table.

import { set as rxSet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/data'
import { receiveTableData } from 'fetch/tableData'
import { stringToPrecision } from 'app/util'
import dataStore from 'cellTypeGene/ctgDataStore'
import makeButtons from 'cellTypeGene/buttons'
import { DOMAIN } from 'cellTypeGene/ctgMain'

const USE_TEST_DATA = false

const testData = {
    cluster_name: 'cluster-name',
    gene_table:
`gene    log2 fold change vs next    support
EGFR    0    0.1333333    0.6357
VEGFA    -1.8606666    0.2378    0.74
APOE    -2.4382    -0.234    0.94
IL6    2.7195    -0.3674    0.54`
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
    
    // Build the buttons for each row.
    makeButtons(columns, cleanData)

    // Save the columns and data then render.
    dataStore.load(columns, cleanData)
    /*
    setTimeout(() => { window.scrollTo(0, 100) }, 1000)

    window.scroll({
        top: 300,
        left: 0,
        behavior: 'smooth'
    })
    */
    rxSet('cellTypeGene.render.now')
}

const receiveDataFromServer = (data) => {
    // Receive the data from the server and call to extract the columns from
    // the data.
    
    // Save the cluster to which this gene data belongs.
    rxSet('cellTypeGene.cluster.load', { value: data.cluster_name })
    
    // Derive the table columns and body data from the server data.
    receiveTableData(DOMAIN, data.gene_table, receiveTableDataFromServer)
}

const buildGeneTableUrl = (cluster) => {
    return '/user/elie' +
        '/worksheet/worksheetName' +
        '/cluster/' + cluster
}

const getGeneTableData = (cluster) => {
    // Request the data from the server.
    const url = buildGeneTableUrl(cluster)
    if (USE_TEST_DATA) {
        receiveData(DOMAIN, testData, receiveDataFromServer)
    } else {
        fetchData(DOMAIN, url, receiveDataFromServer)
    }
}

const getInitalGeneTableData = (url) => {
    // Request the initial data from the server.
    if (!url) {
        return
    }
    if (USE_TEST_DATA) {
        receiveData(DOMAIN, testData, receiveDataFromServer)
    } else {
        fetchData(DOMAIN, url, receiveDataFromServer,
            { fullUrl: true })
    }
}

export default getGeneTableData
export { buildGeneTableUrl, getInitalGeneTableData } 
