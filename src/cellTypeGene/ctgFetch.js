
// The fetch for the cell type worksheet gene table.

import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/data'
import { receiveTableData } from 'fetch/tableData'
import { stringToPrecision } from 'app/util'
import dataStore from 'cellTypeGene/ctgDataStore'
import makeButtons from 'cellTypeGene/buttons'
import geneFilter from 'cellTypeGene/geneFilter'
import { DOMAIN } from 'cellTypeGene/ctgMain'

const USE_TEST_DATA = false

const testData = {
	cluster_name: 'cluster-name',
	gene_table:
`gene	log2	fold change vs next	support
EGFR	0	0.1333333	0.6357
VEGFA	-1.8606666	0.2378	0.74
APOE	-2.4382	-0.234	0.94
IL6	2.7195	-0.3674	0.54`
}

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
    rxSet('cellTypeGene.filterText.reset')
    columns[0].options = geneFilter()
    
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
    TODO The scrolling is not working to scroll down to the gene table.
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
    if (!data) {
        return
    }
    
    // Save the cluster to which this gene data belongs.
    rxSet('cellTypeGene.cluster.load', { value: data.cluster_name })
    
    // Derive the table columns and body data from the server data.
    receiveTableData(DOMAIN, data.gene_table, receiveTableDataFromServer)
}

const buildGeneTableUrl = (cluster, includeHost) => {
    let url =
        '/user/' + rxGet('auth.user').name +
        '/worksheet/' + rxGet('cellTypeWork.sheetSelected') +
        '/cluster/' + cluster
    if (includeHost) {
        url = process.env.REACT_APP_DATA_URL + url
    }
    return url
}

const getGeneTableData = (cluster) => {
    // Request the data from the server.
    const url = buildGeneTableUrl(cluster)
    let options = { credentials: true }

    if (USE_TEST_DATA) {
        rxSet(DOMAIN + '.fetchStatus.waiting')
        receiveData(DOMAIN, testData, receiveDataFromServer, options)
    } else {
        fetchData(DOMAIN, url, receiveDataFromServer, options)
    }
}

const getInitalGeneTableData = (clusters, url) => {
    // Request the initial data from the server.
    let options = { credentials: true }
    if (url) {
        options.fullUrl = true
        if (USE_TEST_DATA) {
            rxSet(DOMAIN + '.fetchStatus.waiting')
            receiveData(DOMAIN, testData, receiveDataFromServer, options)
        } else {
            fetchData(DOMAIN, url, receiveDataFromServer, options)
        }
    } else {
        const url = buildGeneTableUrl(clusters[0].name)
        fetchData(DOMAIN, url, receiveDataFromServer, options)
    }
}

export default getGeneTableData
export { buildGeneTableUrl, getInitalGeneTableData } 
