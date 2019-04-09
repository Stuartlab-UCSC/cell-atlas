
// The gene page component logic.

import { connect } from 'react-redux'


import { get as rxGet, set as rxSet } from 'state/rx'
//import fetchData from 'fetch/fetchData'
import testData from 'gene/data'
import Presentation from 'gene/pagePres'
import { serverRequest } from 'gene/inputHeader'
import { sortBy } from 'gene/sort'

let data // the store for data outside of redux state

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

const receiveDataFromServer = (dataIn) => {
    // Handle the data received from the server.
    //console.log('receiveDataFromServer:dataIn:', dataIn)
    data = dataIn.resource  // save to our data area
    sortBy(data.cluster_solutions, 'color', 'descending')
    findVarMagnitudes(data.cluster_solutions)
    rxSet('gene.showChart.toQuietStatus')
    rxSet('gene.firstChartDisplayed.set')
}

// A stub until we have real data on the server.
const fetchData = (gene, url, receiveFx) => {
    rxSet('gene.fetchStatus.waiting')
    rxSet('gene.fetchMessage.set', { value: 'waiting for data...' })
    setTimeout(() => {
        receiveFx(testData)
        rxSet('gene.fetchMessage.clear')
        rxSet('gene.fetchStatus.quiet')
    }, 1000)
}

const getData = () => {
    // Request the data from the server.
    let url =
        '/marker/' + rxGet('gene.name') +
        '/dotplot/' + rxGet('gene.size_by') +
        '/' + rxGet('gene.color_by')
    fetchData('gene', url, receiveDataFromServer)
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

export { onSubmitClick, data, serverRequest }

export default GeneCharts
