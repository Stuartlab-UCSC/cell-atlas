
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

const buildScatterPlotUrl = (gene, includeHost) => {
    let url =
        '/user/' + rxGet('auth.user').name +
        '/worksheet/' + rxGet('cellTypeWork.selectedSheet') +
        '/scatterplot/umap'
    if (gene) {
         url += '/gene/' + gene
    }
    if (includeHost) {
        url = process.env.REACT_APP_DATA_URL + url
    }
    return url
}

const getClusterAssignmentScatterPlot =
    (clustersIn, colormapIn, urlIn, optionsIn) => {
    // Request a cluster assignment plot from the server.
    let clusters = clustersIn || dataStore.getClusters()
    let colormap = colormapIn || rxGet('cellTypeWork.colormap')
    let url = urlIn || buildScatterPlotUrl()
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
    let url = urlIn || buildScatterPlotUrl(gene)
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
    if (url) {
        // Retrieve either a gene or cluster assignment scatterplot.
        const split = url.split('/')
        if (split.slice(-2,-1)[0] === 'gene') {
            getGeneScatterPlot(split.slice(-1)[0], url, options)
        } else {
            getClusterAssignmentScatterPlot(clusters, colormap, url, options)
        }
    } else {
        // By default get a cluster assignment scatterplot.
        getClusterAssignmentScatterPlot(clusters, colormap, null, options)
    }
}

const scatterColumnsReordered = () => {
    // When columns are re-ordered we need to update the colors on the
    // cluster assignment scatterplot if one is showing.
    if (rxGet('cellTypeScatter.gene')) {
        return
    }
    getClusterAssignmentScatterPlot()
}

const mapStateToProps = (state) => {
    return {
        columnsReordered: state.cellTypeWork.columnOrder,
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

export { buildScatterPlotUrl, scatterColumnsReordered,
    getClusterAssignmentScatterPlot, getGeneScatterPlot, getInitialScatterPlot }
