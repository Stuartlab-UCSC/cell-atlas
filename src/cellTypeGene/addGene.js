
// The logic to get a gene's values for all clusters to add to the
// cell type worksheet.

import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData from 'fetch/data'
import { addGeneBubbles } from 'cellTypeWork/transformToBubbles'
import { geneAlreadyThere } from 'cellTypeGene/ctgTable'
import dataStore from 'cellTypeWork/dataStore'
import { USE_TEST_DATA } from 'cellTypeSheet/sheetList'

const DOMAIN = 'cellTypeGeneClusters'
const testData =
`stat	1	2	3
color_by	0	0.6357	-0.4
size_by	0.8606	0.74	0.4`

const receiveDataFromServer = (data) => {
    const error = rxGet(DOMAIN + '.fetchMessage')
    if (error !== null) {
        alert(error)
    } else {
        addGeneBubbles(data)
    }
    // Get the next gene in the list.
    getGenesForAllClusters()
}

// A test stub in place of server query.
const fetchTestData = (id, url, receiveFx) => {
    rxSet('cellTypeGeneClusters.fetchStatus.waiting')
    rxSet('cellTypeGeneClusters.fetchMessage.set', { value: 'waiting for data...' })
    setTimeout(() => {
        receiveFx(testData)
        rxSet('cellTypeGeneClusters.fetchMessage.clear')
        rxSet('cellTypeGeneClusters.fetchStatus.quiet')
    }, 1000)
}

const getGeneForAllClusters = (gene) => {
    // Request one gene's data for all clusters.
    const colorBy = dataStore.getColorBy()
    const sizeBy = dataStore.getSizeBy()
    let url =
        '/user/' + dataStore.getSourceUser() +
        '/worksheet/' + dataStore.getSourceWorksheet() +
        '/gene/' + gene +
        '/color/' + colorBy +
        '/size/' + sizeBy
    let options = { credentials: true, responseType: 'text' }
    if (USE_TEST_DATA) {
        fetchTestData('cellTypeGeneClusters', url, receiveDataFromServer)
    } else {
        fetchData('cellTypeGeneClusters', url, receiveDataFromServer,
            options)
    }
    // Save the gene selected.
    rxSet('cellTypeGene.geneSelected.uiSet', { value: gene })
}

const getGenesForAllClusters = () => {
    // Request the data for a list of genes for all clusters.
    const genes = rxGet('cellTypeGeneClusters.filterText')
    if (genes.length < 1) {
        return
    }
    // Pull the first gene out of the genes string.
    let gene = genes
    const index = genes.indexOf('\n')
    if (index > -1) {
        gene = genes.slice(0, index)
    }
    // Get the gene data if it is not in the worksheet.
    if (!geneAlreadyThere(gene)) {
        // We can only track one fetch at a time for a gene add,
        // so request the data in multiple fetches, one per gene.
        // Fetch the first gene only. The receiveDataFromServer function will
        // call this again.
        getGeneForAllClusters(gene)
    }
    // Remove this gene from the list.
    rxSet('cellTypeGeneClusters.filterText.shift')
}

export { getGeneForAllClusters, getGenesForAllClusters }
