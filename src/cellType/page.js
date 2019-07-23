
// The gene page component logic.

import { connect } from 'react-redux'

import { /*get as rxGet,*/ set as rxSet } from 'state/rx'
import fetchData from 'fetch/data'
import testData from 'cellType/data'
import { summarizeCats, clearCats, catAttrs, gatherUniqueCats }
    from 'color/colorCat'
import Presentation from 'cellType/pagePres'
import sortBy from 'cellType/sortBy'
//import { isValidGeneName } from 'components/geneName'

const USE_TEST_DATA = false
const FIXED_BUBBLE_SIZE_AT_MAX = false

let data = [] // the store for data outside of redux state

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

        // Find the color and size ranges.
        solutions[i].clusters.forEach((cluster) => {
            color.max = Math.max(cluster.color, color.max)
            color.min = Math.min(cluster.color, color.min)
            bubble.max = Math.max(cluster.size, bubble.max)
        })
    })
    
    // Assign colors to the categories & get a list of attrs with single values.
    const sameValueColumns = summarizeCats()
    rxSet('cellType.sameValueColumns.found', { value: sameValueColumns })
    
    // Save the magnitudes found.
    if (color.min < 0) {
        // Adjust the endpoints to be the same distance from zero.
        color.max = Math.max(color.max, -color.min)
        color.min = -color.max
    } else {
        // All values are positive.
        color.max = color.max
        color.min = 0
    }
    rxSet('cellType.colorRange.set', { value: color })
    if (FIXED_BUBBLE_SIZE_AT_MAX) {
        rxSet('cellType.bubbleRange.set', { value: { min: 0, max: 1 }})
    } else {
        rxSet('cellType.bubbleRange.set', { value: bubble })
    }
}

const receiveDataFromServer = (dataIn) => {
    // Handle the data received from the server.
    data = dataIn.resource  // save to our data area
    
    // Make size and color be by sensitivity.
    data.color_by = data.size_by
    data.cluster_similarities.forEach((cs) => {
        cs.clusters.forEach((c) => {
            if (c.size < 0) {
                console.error(
                    'cluster.size is less than zero, so setting it to zero for:',
                    '\n  dataset:', cs.dataset,
                    '\n  compared_to_cluster:', cs.compared_to_cluster,
                    '\n  cluster_solution_name:', cs.cluster_solution_name,
                    '\n  cluster:', c)
                c.size = 0
            }
            c.color = c.size
        })
    })

    data.cluster_similarities = sortBy(data.cluster_similarities)
    findDerivedData(data.cluster_similarities)
    rxSet('cellType.showChart.toQuietStatus')
    rxSet('cellType.firstChartDisplayed.set')
}


// A test stub in place of server query.
const fetchTestData = (gene, url, receiveFx) => {
    rxSet('cellType.fetchStatus.waiting')
    rxSet('cellType.fetchMessage.set', { value: 'waiting for data...' })
    setTimeout(() => {
        receiveFx(testData)
        rxSet('cellType.fetchMessage.clear')
        rxSet('cellType.fetchStatus.quiet')
    }, 1000)
}

const getData = () => {
    // Request the data from the server.
    let url =
        '/dotplot/cluster_solution/someUserClusterSolution' + // TODO
        '/color/MYL7'
        // '/color/' + rxGet('geneName.cellType.name')
    if (USE_TEST_DATA) {
        fetchTestData('cellType', url, receiveDataFromServer)
    } else {
        fetchData('cellType', url, receiveDataFromServer)
    }
}

const serverRequest = (dispatch) => {
    dispatch({ type: 'cellType.showChart.toRequestStatus' })
    getData()
}

const onGeneSubmit = (dispatch) => {
    // The gene name is already validated.
    serverRequest(dispatch)
}

const mapStateToProps = (state) => {
    if (data.length < 1) {
        getData()
    }
    return {
        colorColumnTooltip: state.bubble.colorColumnTooltip,
        bubbleRange: state.cellType.bubbleRange,
        bubbleTooltip: state.bubble.tooltip,
        catAttrs,
        colorRange: state.cellType.colorRange,
        data,
        message: state.cellType.fetchMessage,
        sameValueColumns: state.cellType.sameValueColumns,
        showChart: state.cellType.showChart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFindClick: (ev) => {
            /*
            if (isValidGeneName(dispatch)) {
                onGeneSubmit(dispatch)
            }
            */
        },
    }
}

const CellType = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export { getData, data, onGeneSubmit, serverRequest, FIXED_BUBBLE_SIZE_AT_MAX }

export default CellType
