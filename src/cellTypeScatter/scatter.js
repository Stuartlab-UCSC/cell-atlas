
// The worksheet logic for the cell type worksheet page.

import { connect } from 'react-redux'
import { set as rxSet } from 'state/rx'
import ScatterPlotPres from 'cellTypeScatter/scatterPres'
import fetchData from 'fetch/data'
import testScatterPlot from 'cellTypeScatter/scatterPlot.png'

const USE_TEST_DATA = true
const testData = testScatterPlot
let scatterPlot = testScatterPlot // the png from the data server.

const receiveDataFromServer = (data) => {
    console.log('data:', data)
    // Handle the data received from the server.
    rxSet('cellTypeScatter.showChart.loading')
    scatterPlot = data
    rxSet('cellTypeScatter.showChart.toQuietStatus')
    rxSet('cellTypeScatter.firstChartDisplayed.now')
}

// A test stub in place of server query.
const fetchTestData = (id, url, receiveFx) => {
    //console.log('fetchTestData: id, url, receiveFx:', id, url, receiveFx)
    rxSet('cellTypeScatter.fetchStatus.waiting')
    rxSet('cellTypeScatter.fetchMessage.set', { value: 'waiting for data...' })
    setTimeout(() => {
        receiveFx(testData)
        rxSet('cellTypeScatter.fetchMessage.clear')
        rxSet('cellTypeScatter.fetchStatus.quiet')
    }, 1000)
}

const getClusterAssignmentScatterPlot = (urlIn) => {
    console.log('getClusterAssignmentScatterPlot')
    /*
    let url = urlIn
    if (!url) {
        url = 'user/{user}/worksheet/{name}/scatterplot/umap'
    }
    let payload = {
        color: [#FFFFFF, ... ]
        cluster-name:["1", ... ]
    }
    rxSet('cellTypeScatter.gene.uiSet', { value: 'Cluster Assignments' })
    */
}

const getGeneScatterPlot = (gene, urlIn) => {
    // Request the data from the server.
    let url = urlIn
    if (!url) {
        url = '/user/someUser/worksheet/someWorksheet/scatterplot/umap/gene/'
            + gene
    }
    // Save the gene.
    rxSet('cellTypeScatter.gene.uiSet', { value: gene })
    if (USE_TEST_DATA) {
        fetchTestData('cellTypeScatter', url, receiveDataFromServer, 'image')
    } else {
        fetchData('cellTypeScatter', url, receiveDataFromServer, 'image')
    }
}

const getScatterPlot = (clusters, colormap, url) => {
    // Request the data from the server when just a url is given
    // TODO find a gene to determine if we want to gene or cluster assignment.
    // TODO if no gene, request a cluster assignment scatterplot.
    getGeneScatterPlot('C1QC', url)
}

const mapStateToProps = (state) => {
    return {
        plot: scatterPlot,
        fetchMessage: state.cellTypeScatter.fetchMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const ScatterPlot = connect(
    mapStateToProps, mapDispatchToProps
)(ScatterPlotPres)

export default ScatterPlot

export { getGeneScatterPlot, getClusterAssignmentScatterPlot, getScatterPlot }
