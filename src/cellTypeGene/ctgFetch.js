
// The fetch for the cell type worksheet gene table.

import { set as rxSet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/data'
import { receiveTableData } from 'fetch/tableData'
import { stringToPrecision } from 'app/util'
import dataStore from 'cellTypeGene/ctgDataStore'
import ctwDataStore from 'cellTypeWork/dataStore'
import makeButtons from 'cellTypeGene/buttons'
import ctgFilter from 'cellTypeGene/ctgFilter'
import { DOMAIN } from 'cellTypeGene/ctgMain'
import { newDataReceived } from 'cellTypeGene/ctgDisplayRows'
import testData from 'cellTypeGene/ctgTestData'
import { USE_TEST_DATA } from 'cellTypeWork/sheetList'

const receiveTableDataFromServer = (columns, data) => {
    // Receive the table column and body data
    // derived from the original data from the server.
    
    // Save all of the variable names in the table.
    // Variable names start in column index 1.
    const list = columns.slice(1).map(column => {
        column.options = {filter: false}
        return {
            value: column.name,
            name: column.name,
        }
    })
    rxSet('cellTypeGene.variableList.load', { value: list })
    
    // Filtering by gene name.
    rxSet('cellTypeGene.filterText.init')
    columns[0].options = ctgFilter()
    
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
    newDataReceived()
}

const receiveDataFromServer = (data) => {
    // Receive the data from the server and call to extract the columns from
    // the data.
    if (!data) {
        return
    }
    
    // Save the cluster to which this gene data belongs.
    rxSet('cellTypeGene.cluster.load', { value: data.cluster_name })
    
    // Derive the table columns and body data from the server data.
    receiveTableData(DOMAIN, data.gene_table, receiveTableDataFromServer)
}

const buildGeneTableUrl = (cluster, toServerStore) => {
    // @param toServerStore: true: the url is to be written to the server state
    // so it needs the data server prefix.
    let url =
        '/user/' + ctwDataStore.getSourceUser() +
        '/worksheet/' + ctwDataStore.getSourceWorksheet() +
        '/cluster/' + cluster
    if (toServerStore) {
        // Prefix the url with the data server host name.
        url = process.env.REACT_APP_DATA_URL + url
    }
    return url
}

const getGeneTableData = (cluster) => {
    // Request the data from the server.
    const url = buildGeneTableUrl(cluster)
    let options = { credentials: true }
    rxSet('cellTypeGene.show.hide')
    if (USE_TEST_DATA) {
        rxSet(DOMAIN + '.fetchStatus.waiting')
        receiveData(DOMAIN, testData, receiveDataFromServer, options)
    } else {
        fetchData(DOMAIN, url, receiveDataFromServer, options)
    }
}

const getInitalGeneTableData = () => {
    // Request the initial data from the server.
    let options = { credentials: true }
    let url = ctwDataStore.getGeneTableUrl()
    rxSet('cellTypeGene.show.hide')
    if (url) {
        options.fullUrl = true
        if (USE_TEST_DATA) {
            rxSet(DOMAIN + '.fetchStatus.waiting')
            receiveData(DOMAIN, testData, receiveDataFromServer, options)
        } else {
            fetchData(DOMAIN, url, receiveDataFromServer, options)
        }
    } else {
        let clusters = ctwDataStore.getClusters()
        url = buildGeneTableUrl(clusters[0].name)
        fetchData(DOMAIN, url, receiveDataFromServer, options)
    }
}

export default getGeneTableData
export { buildGeneTableUrl, getInitalGeneTableData } 
