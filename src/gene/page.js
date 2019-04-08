
// The gene page component logic.

import { connect } from 'react-redux'


import { set as rxSet } from 'state/rx'
//import fetchData from 'fetch/fetch'
import testData from 'gene/data'
import Presentation from 'gene/pagePres'
import { serverRequest } from 'gene/inputHeader'

let data // the store for data outside of redux state

const sortClustersByColor = (dataIn) => {
    // Sort the clusters within this solution by size.
    let data = dataIn.slice()
    data.sort(((a, b) => { return b.size - a.size }))
    return data
}

const sortSolutionsByColor = (solutions) => {
    // Sort the solutions by cluster colors within the solution.
    const compare = (a, b) => {
        for (var i = 0; i < a.clusters.length; i++) {
            if (i > b.clusters.length - 1) {
                break;
            }
            if (a.clusters[i].color !== b.clusters[i].color) {
                return b.clusters[i].color - a.clusters[i].color
            }
        }
        return 0
    }
    solutions.sort(compare)
    return solutions
}

const sortByColor = (solutions) => {
    solutions.forEach((solution, i) => {
        // Sort the clusters within this solution by color.
        solutions[i].clusters =
            sortClustersByColor(solution.clusters)
    })
    // Sort the solutions by cluster colors within the solution.
    sortSolutionsByColor(solutions)
}

const findVarMagnitudes = (solutions) => {
    // Find the magnitudes of sizes and colors.
    let colorNegMag = 0
    let colorPosMag = 0
    let sizeMag = 0
    solutions.forEach((solution, i) => {
        solutions[i].clusters.forEach((cluster) => {
            colorPosMag = Math.max(cluster.color, colorPosMag)
            colorNegMag = Math.min(cluster.color, colorNegMag)
            sizeMag = Math.max(cluster.size, sizeMag)
        })
    })
    // Adjust the endpoints to be the same distance from zero.
    const mag = Math.max(colorPosMag, -colorNegMag)
    const negMag = -mag
    rxSet('gene.colorNegMag.set', { value: negMag })
    rxSet('gene.colorPosMag.set', { value: mag })
    rxSet('gene.sizeMag.set', { value: sizeMag })
}

const receiveData = (dataIn) => {
    // Handle the data received from the server.
    data = dataIn
    sortByColor(data.cluster_solutions)
    findVarMagnitudes(data.cluster_solutions)
    rxSet('gene.showChart.toQuietStatus')
    rxSet('gene.fetchMessage.clear')
    rxSet('gene.fetchStatus.quiet')
    rxSet('gene.firstChartDisplayed.set')
}

const getData = () => {
    // Request the data from the server.
    rxSet('gene.fetchStatus.waiting')
    rxSet('gene.fetchMessage.set', { value: 'waiting for data...' })
    // TODO set a timeout to simulate waiting for server.
    setTimeout(() => { receiveData(testData) }, 1000)
    /*
    let url =
        'marker/' + rxGet('gene.name') +
        '/size-by/' + rxGet('gene.size_by') +
        '/color-by/' + rxGet('gene.color_by') +
  
    //fetchData('gene', url, receiveData)
    */
}

const mapStateToProps = (state) => {
    // Handle any changes to the fetch status.
    if (state['gene.fetchStatus'] === 'request') {
        getData()
    }
    return {
        bubbleTooltip: state['gene.bubbleTooltip'],
        data,
        message: state['gene.fetchMessage'],
        legendVariable: state['gene.legendVariable'],
        showChart: state['gene.showChart'],
    }
}

const onSubmitClick = (dispatch) => {
    serverRequest(dispatch)
    if (window.location.pathname === '/') {
        // We are querying from the home page, so set the home redirect
        // so the next render of home will redirect to the gene chart
        // page.
        dispatch({type: 'home.redirect.set'})
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitClick: ev => {
            onSubmitClick(dispatch)
        },
    }
}

const GeneCharts = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export { onSubmitClick, serverRequest }

export default GeneCharts
