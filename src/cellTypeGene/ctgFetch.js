
// The fetch for the cell type worksheet gene table.

import { rxGet, set as rxSet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/data'
import { receiveTableData } from 'fetch/tableData'
import { stringToPrecisionNumber } from 'app/util'
import dataStore from 'cellTypeGene/ctgDataStore'
import ctwDataStore from 'cellTypeWork/dataStore'
import makeButtons from 'cellTypeGene/buttons'
import { DOMAIN } from 'cellTypeGene/ctgMain'
import { newDataReceived } from 'cellTypeGene/ctgDisplayRows'
import testData from 'cellTypeGene/ctgTestData'
import { USE_TEST_DATA } from 'cellTypeSheet/sheetList'

const tooltips = {
    'pct.exp': "The percent of cells in the cluster expressing a gene.",
    'avg.exp.scaled': "The average expression of a gene in the cluster " +
        "scaled to unit variance with maxium values of plus and minus 2.5.",
    't-statistic': "The student's t-test statistic for cells in the cluster " +
        "vs all other cells.",
    't.pval': "The uncorrected pvalue for the student's t-test."
}

const findColumnTooltip = (name) => {
    const varName = Object.keys(tooltips).find(key => {
        return (key === name)
    })
    return (varName) ? tooltips[varName] : null
}

const receiveTableDataFromServer = (columns, data) => {
    // Receive the table column and body data
    // derived from the original data from the server.

    // initialize the gene name column options.
    columns[0].options = {}

    // Save all of the variable names in the table.
    // Variable names start in column index 1.
    const list = columns.slice(1).map(column => {
        column.options = {filter: false}
        const hint = findColumnTooltip(column.name)
        if (hint) {
            column.options.hint = hint
        }
        return {
            value: column.name,
            name: column.name,
        }
    })
    rxSet('cellTypeGene.variableList.load', { value: list })
    
    // Shorten the values to 4 significant digits.
    let cleanData =
        data.map(row => {
            return row.map((col, i) => {
                if (i < 1) {
                    return col
                }
                return stringToPrecisionNumber(col, 4)
            })
        })
    
    // Build the buttons for each row.
    makeButtons(columns, cleanData)

    // Save the columns and data then render.
    dataStore.load(columns, cleanData)
    newDataReceived()
}

const receiveDataFromServer = (data) => {
    // Receive the data from the server and call to extract the columns from
    // the data.
    
    const error = rxGet(DOMAIN + '.fetchMessage')
    if (error !== null) {
        rxSet('app.snackbar.open', { value: {
            severity: 'error',
            message: 'Retrieving gene stats failed with: ' + error
        }})
        return
    }

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
    rxSet('cellTypeGene.show.getGeneTable')
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
    rxSet('cellTypeGene.show.getInitialGeneTable')
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
