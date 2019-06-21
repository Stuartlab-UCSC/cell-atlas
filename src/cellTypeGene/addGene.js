
// The logic to get a gene's values for all clusters to add to the
// cell type worksheet.

import { set as rxSet } from 'state/rx'
import fetchData from 'fetch/data'
import { addGeneBubbles } from 'cellTypeWork/transformToBubbles'
import dataStore from 'cellTypeWork/dataStore'

const USE_TEST_DATA = false
const testData =
`stat	1	2	3
color_by	0	0.6357	-0.4
size_by	0.8606	0.74	0.4`

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
    const colorBy = dataStore.getColorBy()
    const sizeBy = dataStore.getSizeBy()

    let url =
        '/user/myUser/worksheet/myWorksheet/gene/' +
        gene +
        '/color/' + colorBy +
        '/size/' + sizeBy
    if (USE_TEST_DATA) {
        fetchTestData('cellTypeGeneClusters', url, addGeneBubbles)
    } else {
        fetchData('cellTypeGeneClusters', url, addGeneBubbles, true)
    }
}

export { getDataForAllClusters }
