
// The logic to get a gene's values for all clusters to add to the
// cell type worksheet.

import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData from 'fetch/fetchData'
import { addGeneBubbles } from 'cellTypeWork/transformToBubbles'

const USE_TEST_DATA = true
const testData =
`stat	1	2	3
color_by	0	0.6357	-0.4
size_by	0.8606	0.74	0.4`

const receiveDataFromServer = (data) => {
    // Handle the data received from the server.
    const gene = rxGet('cellTypeGene.geneSelected')
    const { bubbles, colorRange, sizeRange } = addGeneBubbles(data, gene)
    rxSet('cellTypeWork.dims.newGene', {
        colorRange,
        sizeRange,
    })
    rxSet('cellTypeWork.data.newGene', {
        gene,
        bubbles,
    })
    // Notify that new data is ready
    //rxSet('cellTypeGeneClusters.newData.ready')
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

const getDataForAllClusters = (gene) => {
    // Request the data from the server.
    let url =
        '/cell_type/'
    if (USE_TEST_DATA) {
        fetchTestData('cellTypeGeneClusters', url, receiveDataFromServer)
    } else {
        fetchData('cellTypeGeneClusters', url, receiveDataFromServer)
    }
}

export { getDataForAllClusters }
