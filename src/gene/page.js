
// The gene page component logic.

import { connect } from 'react-redux'

import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData from 'fetch/fetchData'
import { isValidGeneName } from 'components/geneName'

import testData from 'gene/data'
import { assignCatColors, clearColorCats, coloredAttrs, gatherUniqueCats }
    from 'gene/colorCat'
import Presentation from 'gene/pagePres'
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
        '/marker/' + rxGet('geneName.gene.name') +
        '/dotplot/' + rxGet('gene.size_by') +
        '/' + rxGet('gene.color_by')
    if (USE_TEST_DATA) {
        fetchTestData('gene', url, receiveDataFromServer)
    } else {
        fetchData('gene', url, receiveDataFromServer)
    }
}

const serverRequest = (dispatch) => {
    dispatch({ type: 'gene.showChart.toRequestStatus' })
    getData()
}

const onGeneSubmit = (dispatch) => {
    // We've already validated the gene name.
    if (window.location.pathname === '/') {
        // From home page.
        dispatch({ type: 'app.homeRedirect.set' })
    }
    serverRequest(dispatch)
}

const onGeneFindClick = (dispatch) => {
    // Button was clicked so we still need to validate gene name field.
    if (isValidGeneName(dispatch, 'gene')) {
        onGeneSubmit(dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        bubbleTooltip: state.gene.bubbleTooltip,
        colorColumnTooltip: state.gene.colorColumnTooltip,
        coloredAttrs,
        data,
        message: state.gene.fetchMessage,
        sameValueColumns: state.gene.sameValueColumns,
        showChart: state.gene.showChart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFindClick: ev => {
            onGeneFindClick(dispatch)
        },
    }
}

const GeneCharts = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export { data, serverRequest, onGeneFindClick, onGeneSubmit }
export default GeneCharts
