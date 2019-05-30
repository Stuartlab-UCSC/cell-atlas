
// The gene page component logic.

import { connect } from 'react-redux'

import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData from 'fetch/fetchData'
import { isValidGeneName } from 'components/geneName'

import testData from 'gene/data'
import { summarizeCats, clearCats, catAttrs, gatherUniqueCats }
    from 'color/colorCat'
import Presentation from 'gene/pagePres'
import { tableNewData } from 'gene/table'

const USE_TEST_DATA = false
let data // the store for data outside of redux state

const findDerivedData = (solutions) => {
    // Find the values that are derived from the data.
    clearCats()
    let color = { min: 0, max: 0 }
    let bubble = { min: 0, max: 0 }
    solutions.forEach((soln, i) => {
        
        // Find the unique categorical values.
        gatherUniqueCats({
            datasetName: soln.dataset.name,
            cluster_solution_name: soln.cluster_solution_name,
            species: soln.dataset.species,
            organ: soln.dataset.organ,
            study: soln.dataset.study,
        })

        // Find the color and size bounds.
        solutions[i].clusters.forEach((cluster) => {
            color.max = Math.max(cluster.color, color.max)
            color.min = Math.min(cluster.color, color.min)
            bubble.max = Math.max(cluster.size, bubble.max)
        })
    })
    
    // Assign colors to the categories & get a list of attrs with single values.
    rxSet('gene.sameValueColumns.found', { value: summarizeCats() })

    // Save the color and size bounds found.
    if (color.min < 0) {
        // Adjust the endpoints to be the same distance from zero.
        color.max = Math.max(color.max, -color.min)
        color.min = -color.max
    } else {
        // All values are positive; set the min to zero.
        color.min = 0
    }
    rxSet('gene.colorRange.set', { value: color })
    rxSet('gene.bubbleRange.set', { value: bubble })
}

const receiveDataFromServer = (dataIn) => {
    // Handle the data received from the server.
    data = dataIn.resource
    rxSet('gene.sort.reset')
    findDerivedData(data.cluster_solutions)
    tableNewData(data)
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
        '/dotplot/' + rxGet('gene.sizeBy') +
        '/' + rxGet('gene.colorBy')
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
        bubbleRange: state.gene.bubbleRange,
        bubbleTooltip: state.bubble.tooltip,
        colorRange: state.gene.colorRange,
        colorColumnTooltip: state.bubble.colorColumnTooltip,
        catAttrs,
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
