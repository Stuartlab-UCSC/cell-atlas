
// The gene page component logic.

import { connect } from 'react-redux'

import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData from 'fetch/fetchData'
import testData from 'gene/data'
import { assignCatColors, clearColorCats, coloredAttrs, gatherUniqueCats }
    from 'gene/colorCat'
import Presentation from 'gene/pagePres'
import { serverRequest } from 'gene/inputHeader'
import { sortBy } from 'gene/sort'

const USE_TEST_DATA = true
let data // the store for data outside of redux state

const findDerivedData = (solutions) => {
    // Find the values that are derived from the data.
    clearColorCats()
    let colorNegMag = 0
    let colorPosMag = 0
    let sizeMag = 0
    solutions.forEach((soln, i) => {
        
        // Find the unique categorical values.
        gatherUniqueCats(soln.dataset)

        // Find the color and size magnitudes.
        solutions[i].clusters.forEach((cluster) => {
            colorPosMag = Math.max(cluster.color, colorPosMag)
            colorNegMag = Math.min(cluster.color, colorNegMag)
            sizeMag = Math.max(cluster.size, sizeMag)
        })
    })
    
    // Assign colors to the categories & get a list of attrs with single values.
    rxSet('gene.sameValueColumns.found', { value: assignCatColors() })
    
    // Save the magnitudes found.
    let mag
    let negMag
    if (colorNegMag < 0) {
        // Adjust the endpoints to be the same distance from zero.
        mag = Math.max(colorPosMag, -colorNegMag)
        negMag = -mag
    } else {
        // All values are positive.
        mag = colorPosMag
        negMag = 0
    }
    rxSet('gene.colorNegMag.set', { value: negMag })
    rxSet('gene.colorPosMag.set', { value: mag })
    rxSet('gene.sizeMag.set', { value: sizeMag })
}

const receiveDataFromServer = (dataIn) => {
    // Handle the data received from the server.
    data = dataIn.resource  // save to our data area
    sortBy(data.cluster_solutions, 'color', 'descending')
    findDerivedData(data.cluster_solutions)
    rxSet('gene.showChart.toQuietStatus')
    rxSet('gene.firstChartDisplayed.set')
}


// A test stub in place of server query.
const fetchTestData = (gene, url, receiveFx) => {
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
    if (USE_TEST_DATA) {
        fetchTestData('gene', url, receiveDataFromServer)
    } else {
        fetchData('gene', url, receiveDataFromServer)
    }
}

const mapStateToProps = (state) => {
    return {
        bubbleTooltip: state['gene.bubbleTooltip'],
        coloredAttrs,
        data,
        message: state['gene.fetchMessage'],
        sameValueColumns: state['gene.sameValueColumns'],
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

export { getData, data, onSubmitClick, serverRequest }

export default GeneCharts
