
// The worksheet logic for the cell type worksheet page.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import dataStore from 'cellTypeWork/dataStore'
import ScatterPlotPres from 'cellTypeScatter/scatterPres'
import fetchData from 'fetch/data'
import testScatterPlot from 'cellTypeScatter/scatterPlot.png'

const USE_TEST_DATA = false
const DOMAIN = 'cellTypeScatter'
const testData = testScatterPlot
let scatterStore // the png from the data server.

const receiveDataFromServer = (data) => {
    // Handle the data received from the server.
    rxSet('cellTypeScatter.showChart.loading')
    scatterStore = data
    rxSet('cellTypeScatter.showChart.toQuietStatus')
    rxSet('cellTypeScatter.render.now')
}

// A test stub in place of server query.
const fetchTestData = (id, url, receiveFx, options) => {
    rxSet('cellTypeScatter.fetchStatus.waiting')
    rxSet('cellTypeScatter.fetchMessage.set', { value: 'waiting for data...' })
    setTimeout(() => {
        receiveFx(testData)
        rxSet('cellTypeScatter.fetchMessage.clear')
        rxSet('cellTypeScatter.fetchStatus.quiet')
    }, 1000)
}

const getClusterAssignmentScatterPlot =
    (clustersIn, colormapIn, urlIn, optionsIn) => {
    // Request a cluster assignment plot from the server.
    let clusters = clustersIn || dataStore.getClusters()
    let colormap = colormapIn || rxGet('cellTypeWork.colormap')
    let url = urlIn || '/user/someUser/worksheet/someWorksheet/scatterplot/umap'
    let options = optionsIn || {}
    options.responseType = 'png'
    options.payload = {
        colors: colormap,
        "cluster-name": clusters.map(cluster => {
            return cluster.name
        }),
    }
    rxSet('cellTypeScatter.gene.clear')
    if (USE_TEST_DATA) {
        fetchTestData(DOMAIN, url, receiveDataFromServer, options)
    } else {
        fetchData(DOMAIN, url, receiveDataFromServer, options)
    }
}

const getGeneScatterPlot = (gene, urlIn, optionsIn) => {
    // Request a gene plot from the server.
    let url = urlIn ||
        '/user/someUser/worksheet/someWorksheet/scatterplot/umap/gene/' + gene
    let options = optionsIn || {}
    options.responseType = 'png'
    // Save the gene.
    rxSet('cellTypeScatter.gene.set', { value: gene })
    if (USE_TEST_DATA) {
        fetchTestData(DOMAIN, url, receiveDataFromServer, options)
    } else {
        fetchData(DOMAIN, url, receiveDataFromServer, options)
    }
}

const getInitialScatterPlot = (clusters, colormap, url) => {
    // Request a plot from the server when a url is known.
    let options = { fullUrl: true }
    // By default get a cluster assignment scatterplot.
    if (!url) {
        getClusterAssignmentScatterPlot(clusters, colormap, null, options)
    }
    // Testing
    //url =
    //    'http://localhost:5555/user/someUser/worksheet/someWorksheet/scatterplot/umap/gene/C1QC'
    //
    
    // Retrieve either a gene or cluster assignment scatterplot.
    const split = url.split('/')
    if (split.slice(-2,-1)[0] === 'gene') {
        getGeneScatterPlot(split.slice(-1)[0], url, options)
    } else {
        getClusterAssignmentScatterPlot(clusters, colormap, url, options)
    }
}

const mapStateToProps = (state) => {
    return {
        fetchMessage: state.cellTypeScatter.fetchMessage,
        gene: state.cellTypeScatter.gene,
        plot: scatterStore,
        render: state.cellTypeScatter.render,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: ev => {
            // A click on the cluster assignments button.
            getClusterAssignmentScatterPlot()
        },
    }
}

const ScatterPlot = connect(
    mapStateToProps, mapDispatchToProps
)(ScatterPlotPres)

export default ScatterPlot

export { getClusterAssignmentScatterPlot, getGeneScatterPlot,
    getInitialScatterPlot }
